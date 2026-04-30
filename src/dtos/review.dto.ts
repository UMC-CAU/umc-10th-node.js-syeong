export interface ReviewRequest {
  content: string;
  score: number;
}

export interface ReviewDto {
  storeId: number;
  userId: number;
  content: string;
  score: number;
}

export const bodyToReview = (
  storeId: number,
  body: ReviewRequest
): ReviewDto => {
  if (!storeId) {
    throw new Error("가게 ID가 올바르지 않습니다.");
  }

  if (!body.content || !body.score) {
    throw new Error("리뷰 내용과 점수는 필수입니다.");
  }

  if (body.score < 1 || body.score > 5) {
    throw new Error("리뷰 점수는 1점 이상 5점 이하이어야 합니다.");
  }

  return {
    storeId,
    userId: 1,
    content: body.content,
    score: body.score,
  };
};