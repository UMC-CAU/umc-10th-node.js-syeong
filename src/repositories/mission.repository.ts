import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db.config.js";
import { ChallengeMissionDto } from "../dtos/mission.dto.js";

export const getMissionById = async (
  missionId: number
): Promise<RowDataPacket | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM missions WHERE id = ?`,
    [missionId]
  );

  return rows[0] || null;
};

export const getUserMission = async (
  userId: number,
  missionId: number
): Promise<RowDataPacket | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM user_missions_ch5
     WHERE user_id = ? AND mission_id = ?`,
    [userId, missionId]
  );

  return rows[0] || null;
};

export const createUserMission = async (
  data: ChallengeMissionDto
): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO user_missions_ch5 (user_id, mission_id, status)
     VALUES (?, ?, 'ONGOING')`,
    [data.userId, data.missionId]
  );

  return result.insertId;
};