import { ResultSetHeader, RowDataPacket } from "mysql2";
import { pool } from "../db.config.js";
import { StoreDto } from "../dtos/store.dto.js";

export const createStore = async (data: StoreDto): Promise<number> => {
  const [result] = await pool.query<ResultSetHeader>(
    `INSERT INTO stores (region_id, name, address, category)
     VALUES (?, ?, ?, ?)`,
    [data.regionId, data.name, data.address, data.category]
  );

  return result.insertId;
};

export const getStoreById = async (
  storeId: number
): Promise<RowDataPacket | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM stores WHERE id = ?`,
    [storeId]
  );

  return rows[0] || null;
};

export const getRegionById = async (
  regionId: number
): Promise<RowDataPacket | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM regions WHERE id = ?`,
    [regionId]
  );

  return rows[0] || null;
};