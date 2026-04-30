import { ResultSetHeader } from "mysql2";
import { pool } from "../db.config.js";
import { ReviewDto } from "../dtos/review.dto.js";

export const createReview = async (data: ReviewDto): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO reviews (store_id, user_id, content, score)
     VALUES (?, ?, ?, ?)`,
    [data.storeId, data.userId, data.content, data.score]
  );

  return result.insertId;
};