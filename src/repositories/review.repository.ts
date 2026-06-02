import { prisma } from "../db.config.js";
import { ReviewDto } from "../dtos/review.dto.js";

export const createReview = async (data: ReviewDto): Promise<number> => {
  const created = await prisma.review.create({
    data: {
      storeId: data.storeId,
      userId: data.userId,
      content: data.content,
      score: data.score,
    },
  });

  return created.id;
};

export const getAllStoreReviews = async (
  storeId: number,
  cursor: number
) => {
  return await prisma.review.findMany({
    select: {
      id: true,
      content: true,
      score: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    where: {
      storeId,
      ...(cursor > 0
        ? {
            id: {
              gt: cursor,
            },
          }
        : {}),
    },
    orderBy: {
      id: "asc",
    },
    take: 5,
  });
};