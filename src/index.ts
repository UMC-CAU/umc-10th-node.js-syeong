import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import passport from "passport";
import { RegisterRoutes } from "./generated/routes.js";
import { AppError } from "./common/errors/app.error.js";
import swaggerUi from "swagger-ui-express";
import fs from "node:fs";
import path from "node:path";
import { googleStrategy, jwtStrategy } from "./auth.config.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

passport.use(googleStrategy);
passport.use(jwtStrategy);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.error = function ({ errorCode = "UNKNOWN", reason = null, data = null }) {
    return this.json({
      resultType: "FAIL",
      error: {
        errorCode,
        reason,
        data,
      },
      success: null,
    });
  };

  next();
});

app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

const swaggerFile = JSON.parse(
  fs.readFileSync(path.resolve(process.cwd(), "dist/swagger.json"), "utf8")
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.get(
  "/oauth2/login/google",
  passport.authenticate("google", { session: false })
);

app.get(
  "/oauth2/callback/google",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login-failed",
  }),
  (req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      tokens: req.user,
    });
  }
);

app.get("/login-failed", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "Google 로그인에 실패했습니다.",
  });
});

const isLogin = passport.authenticate("jwt", { session: false });

app.get("/mypage", isLogin, (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "인증 성공! 마이페이지입니다.",
    user: req.user,
  });
});

const router = express.Router();
RegisterRoutes(router);
app.use("/api/v1", isLogin, router);

app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.statusCode || 500).error({
    errorCode: err.errorCode || "UNKNOWN",
    reason: err.message || null,
    data: err.data || null,
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
