import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { paramsToChallengeMission } from "../dtos/mission.dto.js";
import { challengeMissionService } from "../services/mission.service.js";

export const challengeMission = async (req: Request, res: Response) => {
  try {
    const missionId = Number(req.params.missionId);
    const challengeDto = paramsToChallengeMission(missionId);

    const result = await challengeMissionService(challengeDto);

    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: "MISSION201",
      message: "미션 도전 성공",
      result,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }
};