import { ChallengeMissionDto } from "../dtos/mission.dto.js";
import {
  getMissionById,
  getUserMission,
  createUserMission,
} from "../repositories/mission.repository.js";

export const challengeMissionService = async (data: ChallengeMissionDto) => {
  const mission = await getMissionById(data.missionId);

  if (!mission) {
    throw new Error("도전하려는 미션이 존재하지 않습니다.");
  }

  const existingMission = await getUserMission(data.userId, data.missionId);

  if (existingMission) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  const userMissionId = await createUserMission(data);

  return {
    userMissionId,
    userId: data.userId,
    missionId: data.missionId,
    status: "ONGOING",
  };
};