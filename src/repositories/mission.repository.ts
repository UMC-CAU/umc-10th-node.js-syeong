import { prisma } from "../db.config.js";
import { ChallengeMissionDto } from "../dtos/mission.dto.js";

export const getMissionById = async (missionId: number) => {
  return await prisma.mission.findFirst({
    where: {
      id: missionId,
    },
  });
};

export const getUserMission = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMissionCh5.findFirst({
    where: {
      userId,
      missionId,
    },
  });
};

export const createUserMission = async (
  data: ChallengeMissionDto
): Promise<number> => {
  const created = await prisma.userMissionCh5.create({
    data: {
      userId: data.userId,
      missionId: data.missionId,
      status: "ONGOING",
    },
  });

  return created.id;
};

export const getMissionsByStoreId = async (storeId: number) => {
  return await prisma.mission.findMany({
    where: {
      storeId,
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const getOngoingMissionsByUserId = async (userId: number) => {
  return await prisma.userMissionCh5.findMany({
    where: {
      userId,
      status: "ONGOING",
    },
    include: {
      mission: true,
    },
    orderBy: {
      id: "asc",
    },
  });
};

export const completeUserMission = async (
  userId: number,
  missionId: number
) => {
  return await prisma.userMissionCh5.updateMany({
    where: {
      userId,
      missionId,
      status: "ONGOING",
    },
    data: {
      status: "COMPLETED",
    },
  });
};