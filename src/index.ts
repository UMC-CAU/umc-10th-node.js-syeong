import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! This is TypeScript Server!");
});

app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});