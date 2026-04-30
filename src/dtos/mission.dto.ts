export interface ChallengeMissionDto {
  missionId: number;
  userId: number;
}

export const paramsToChallengeMission = (
  missionId: number
): ChallengeMissionDto => {
  if (!missionId) {
    throw new Error("미션 ID가 올바르지 않습니다.");
  }

  return {
    missionId,
    userId: 1,
  };
};