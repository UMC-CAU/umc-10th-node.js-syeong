import type { UpdateMyInfoDto } from "../dtos/user.dto.js";
import { updateUserById } from "../repositories/user.repository.js";

export const updateMyInfoService = async (
  userId: number,
  data: UpdateMyInfoDto
) => {
  return await updateUserById(userId, data);
};
