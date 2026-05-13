import { Body, Controller, Get, Path, Post, Query, Route, Tags } from "tsoa";
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
