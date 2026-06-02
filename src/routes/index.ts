import express from "express";

import { addStore } from "../controllers/store.controller.js";
import {
  addReview,
  handleListStoreReviews,
} from "../controllers/review.controller.js";
import {
  challengeMission,
  getStoreMissions,
  getMyOngoingMissions,
  completeMission,
} from "../controllers/mission.controller.js";

const router = express.Router();

router.post("/regions/:regionId/stores", addStore);

router.post("/stores/:storeId/reviews", addReview);
router.get("/stores/:storeId/reviews", handleListStoreReviews);

router.post("/missions/:missionId/challenges", challengeMission);

router.get("/stores/:storeId/missions", getStoreMissions);
router.get("/users/:userId/missions/ongoing", getMyOngoingMissions);
router.patch("/users/:userId/missions/:missionId/complete", completeMission);

export default router;