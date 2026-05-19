import {
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { paramsToChallengeMission } from "../dtos/mission.dto.js";
import {
  challengeMissionService,
  listStoreMissionsService,
  listMyOngoingMissionsService,
  completeMissionService,
} from "../services/mission.service.js";
import type { ApiResponse } from "../common/responses/response.js";
import { success } from "../common/responses/response.js";
import { AppError } from "../common/errors/app.error.js";

@Route("")
@Tags("Missions")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 사용자가 특정 미션에 도전합니다.
   */
  @SuccessResponse(201, "미션 도전 성공")
  @TsoaResponse<ApiResponse<null>>(400, "미션 도전 실패")
  @Post("missions/{missionId}/challenges")
  public async challengeMission(
    @Path() missionId: number,
  ): Promise<ApiResponse<unknown>> {
    try {
      const challengeDto = paramsToChallengeMission(missionId);
      const result = await challengeMissionService(challengeDto);

      this.setStatus(StatusCodes.CREATED);
      return success({
        code: "MISSION201",
        message: "미션 도전 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "MISSION400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "미션 도전 실패",
      });
    }
  }

  /**
   * 가게 미션 목록 조회 API
   * @summary 특정 가게의 미션 목록을 조회합니다.
   */
  @SuccessResponse(200, "가게 미션 목록 조회 성공")
  @TsoaResponse<ApiResponse<null>>(400, "가게 미션 목록 조회 실패")
  @Get("stores/{storeId}/missions")
  public async getStoreMissions(
    @Path() storeId: number,
  ): Promise<ApiResponse<unknown>> {
    try {
      const result = await listStoreMissionsService(storeId);

      this.setStatus(StatusCodes.OK);
      return success({
        code: "MISSION2001",
        message: "특정 가게의 미션 목록 조회 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "MISSION400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "미션 목록 조회 실패",
      });
    }
  }

  /**
   * 진행 중인 미션 목록 조회 API
   * @summary 사용자가 진행 중인 미션 목록을 조회합니다.
   */
  @SuccessResponse(200, "진행 중인 미션 목록 조회 성공")
  @TsoaResponse<ApiResponse<null>>(400, "진행 중인 미션 목록 조회 실패")
  @Get("users/{userId}/missions/ongoing")
  public async getMyOngoingMissions(
    @Path() userId: number,
  ): Promise<ApiResponse<unknown>> {
    try {
      const result = await listMyOngoingMissionsService(userId);

      this.setStatus(StatusCodes.OK);
      return success({
        code: "MISSION2002",
        message: "내가 진행 중인 미션 목록 조회 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "MISSION400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "진행 중인 미션 조회 실패",
      });
    }
  }

  /**
   * 미션 완료 API
   * @summary 사용자의 진행 중인 미션을 완료 상태로 변경합니다.
   */
  @SuccessResponse(200, "미션 완료 성공")
  @TsoaResponse<ApiResponse<null>>(400, "미션 완료 실패")
  @Patch("users/{userId}/missions/{missionId}/complete")
  public async completeMission(
    @Path() userId: number,
    @Path() missionId: number,
  ): Promise<ApiResponse<unknown>> {
    try {
      const result = await completeMissionService(userId, missionId);

      this.setStatus(StatusCodes.OK);
      return success({
        code: "MISSION2003",
        message: "미션 진행 완료 처리 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "MISSION400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "미션 완료 처리 실패",
      });
    }
  }
}
