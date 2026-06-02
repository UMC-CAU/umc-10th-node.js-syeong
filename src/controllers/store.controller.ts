import {
  Body,
  Controller,
  Path,
  Post,
  Route,
  Tags,
  SuccessResponse,
  Response as TsoaResponse,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { bodyToStore, StoreRequest } from "../dtos/store.dto.js";
import { addStoreService } from "../services/store.service.js";
import type { ApiResponse } from "../common/responses/response.js";
import { success } from "../common/responses/response.js";
import { AppError } from "../common/errors/app.error.js";

@Route("regions/{regionId}/stores")
@Tags("Stores")
export class StoreController extends Controller {
  /**
   * 가게 등록 API
   * @summary 특정 지역에 새로운 가게를 등록합니다.
   */
  @SuccessResponse(201, "가게 등록 성공")
  @TsoaResponse<ApiResponse<null>>(400, "가게 등록 실패")
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
