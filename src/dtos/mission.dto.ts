export interface ChallengeMissionDto {
  missionId: number;
  /** 사용자 ID */
  userId: number;
}

export const paramsToChallengeMission = (
  missionId: number,
  userId: number
): ChallengeMissionDto => {
  if (!missionId) {
    throw new Error("미션 ID가 올바르지 않습니다.");
  }

  if (!userId) {
    throw new Error("로그인한 사용자 정보가 없습니다.");
  }

  return {
    missionId,
    userId,
  };
};
