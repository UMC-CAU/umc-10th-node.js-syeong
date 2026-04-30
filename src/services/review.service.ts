import { ReviewDto } from "../dtos/review.dto.js";
import { getStoreById } from "../repositories/store.repository.js";
import { createReview } from "../repositories/review.repository.js";

export const addReviewService = async (data: ReviewDto) => {
  const store = await getStoreById(data.storeId);

  if (!store) {
    throw new Error("리뷰를 추가하려는 가게가 존재하지 않습니다.");
  }

  const reviewId = await createReview(data);

  return {
    reviewId,
    storeId: data.storeId,
    userId: data.userId,
    content: data.content,
    score: data.score,
  };
};