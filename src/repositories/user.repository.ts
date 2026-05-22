import { prisma } from "../db.config.js";
import type { UpdateMyInfoDto } from "../dtos/user.dto.js";

export const updateUserById = async (
  userId: number,
  data: UpdateMyInfoDto
) => {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data,
  });
};
