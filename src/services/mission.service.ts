import { ChallengeMissionDto } from "../dtos/mission.dto.js";
import {
  createUserMission,
  getMissionById,
  getUserMission,
  getMissionsByStoreId,
  getOngoingMissionsByUserId,
  completeUserMission,
} from "../repositories/mission.repository.js";

export const challengeMissionService = async (
  data: ChallengeMissionDto
): Promise<number> => {
  const mission = await getMissionById(data.missionId);

  if (!mission) {
    throw new Error("존재하지 않는 미션입니다.");
  }

  const existing = await getUserMission(data.userId, data.missionId);

  if (existing) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  return await createUserMission(data);
};

export const listStoreMissionsService = async (storeId: number) => {
  return await getMissionsByStoreId(storeId);
};

export const listMyOngoingMissionsService = async (userId: number) => {
  return await getOngoingMissionsByUserId(userId);
};

export const completeMissionService = async (
  userId: number,
  missionId: number
) => {
  const result = await completeUserMission(userId, missionId);

  if (result.count === 0) {
    throw new Error("진행 중인 미션을 찾을 수 없습니다.");
  }

  return {
    updatedCount: result.count,
  };
};