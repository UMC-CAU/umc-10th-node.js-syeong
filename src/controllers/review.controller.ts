import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  Tags,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, ReviewRequest } from "../dtos/review.dto.js";
import {
  addReviewService,
  listStoreReviews,
} from "../services/review.service.js";
import type { ApiResponse } from "../common/responses/response.js";
import { success } from "../common/responses/response.js";
import { AppError } from "../common/errors/app.error.js";

@Route("stores/{storeId}/reviews")
@Tags("Reviews")
export class ReviewController extends Controller {
  /**
   * 리뷰 작성 API
   * @summary 특정 가게에 리뷰를 작성합니다.
   */
  @SuccessResponse(201, "리뷰 추가 성공")
  @TsoaResponse<ApiResponse<null>>(400, "리뷰 내용, 점수 오류 또는 잘못된 요청")
  @Post()
  public async addReview(
    @Path() storeId: number,
    @Body() body: ReviewRequest,
  ): Promise<ApiResponse<unknown>> {
    try {
      const reviewDto = bodyToReview(storeId, body);
      const result = await addReviewService(reviewDto);

      this.setStatus(StatusCodes.CREATED);
      return success({
        code: "REVIEW201",
        message: "리뷰 추가 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "REVIEW400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "리뷰 추가 실패",
      });
    }
  }

  /**
   * 가게 리뷰 목록 조회 API
   * @summary 특정 가게의 리뷰 목록을 cursor 기반으로 조회합니다.
   */
  @SuccessResponse(200, "리뷰 목록 조회 성공")
  @TsoaResponse<ApiResponse<null>>(400, "리뷰 목록 조회 실패")
  @Get()
  public async handleListStoreReviews(
    @Path() storeId: number,
    @Query() cursor?: number,
  ): Promise<ApiResponse<unknown>> {
    try {
      const result = await listStoreReviews(storeId, cursor ?? 0);

      this.setStatus(StatusCodes.OK);
      return success({
        code: "REVIEW2001",
        message: "리뷰 목록 조회 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "REVIEW400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "리뷰 목록 조회 실패",
      });
    }
  }
}
