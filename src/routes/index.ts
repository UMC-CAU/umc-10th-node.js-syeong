import express from "express";

import { addStore } from "../controllers/store.controller.js";
import { addReview } from "../controllers/review.controller.js";
import { challengeMission } from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/regions/:regionId/stores", addStore);
router.post("/stores/:storeId/reviews", addReview);
router.post("/missions/:missionId/challenges", challengeMission);

export default router;