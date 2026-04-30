import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToReview, ReviewRequest } from "../dtos/review.dto.js";
import { addReviewService } from "../services/review.service.js";

export const addReview = async (req: Request, res: Response) => {
  try {
    const storeId = Number(req.params.storeId);
    const reviewDto = bodyToReview(storeId, req.body as ReviewRequest);

    const result = await addReviewService(reviewDto);

    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: "REVIEW201",
      message: "리뷰 추가 성공",
      result,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }
};