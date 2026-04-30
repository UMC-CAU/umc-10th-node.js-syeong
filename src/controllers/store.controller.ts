import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, StoreRequest } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";

export const addStore = async (req: Request, res: Response) => {
  try {
    const regionId = Number(req.params.regionId);
    const storeDto = bodyToStore(regionId, req.body as StoreRequest);

    const result = await addStoreService(storeDto);

    return res.status(StatusCodes.CREATED).json({
      isSuccess: true,
      code: "STORE201",
      message: "가게 추가 성공",
      result,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      isSuccess: false,
      message: error instanceof Error ? error.message : "알 수 없는 오류",
    });
  }
};