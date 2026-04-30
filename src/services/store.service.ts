import { StoreDto } from "../dtos/store.dto.js";
import {
  createStore,
  getRegionById,
  getStoreById,
} from "../repositories/store.repository.js";

export const addStoreService = async (data: StoreDto) => {
  const region = await getRegionById(data.regionId);

  if (!region) {
    throw new Error("존재하지 않는 지역입니다.");
  }

  const storeId = await createStore(data);
  const store = await getStoreById(storeId);

  return store;
};