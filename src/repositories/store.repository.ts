import { prisma } from "../db.config.js";
import { StoreDto } from "../dtos/store.dto.js";

export const createStore = async (data: StoreDto): Promise<number> => {
  const created = await prisma.store.create({
    data: {
      regionId: data.regionId,
      name: data.name,
      address: data.address,
      category: data.category,
    },
  });

  return created.id;
};

export const getStoreById = async (storeId: number) => {
  return await prisma.store.findFirst({
    where: {
      id: storeId,
    },
  });
};

export const getRegionById = async (regionId: number) => {
  return await prisma.region.findFirst({
    where: {
      id: regionId,
    },
  });
};