import { Body, Controller, Path, Post, Route, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, StoreRequest } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";
import type { ApiResponse } from "../common/responses/response.js";
import { success } from "../common/responses/response.js";
import { AppError } from "../common/errors/app.error.js";

@Route("regions/{regionId}/stores")
@Tags("Stores")
export class StoreController extends Controller {
  @Post()
  public async addStore(
    @Path() regionId: number,
    @Body() body: StoreRequest,
  ): Promise<ApiResponse<unknown>> {
    try {
      const storeDto = bodyToStore(regionId, body);
      const result = await addStoreService(storeDto);

      this.setStatus(StatusCodes.CREATED);
      return success({
        code: "STORE201",
        message: "가게 추가 성공",
        result,
      });
    } catch (error) {
      if (error instanceof AppError) throw error;

      throw new AppError({
        errorCode: "STORE400",
        statusCode: StatusCodes.BAD_REQUEST,
        message: error instanceof Error ? error.message : "가게 추가 실패",
      });
    }
  }
}
