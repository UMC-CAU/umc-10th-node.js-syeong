export interface StoreRequest {
  name: string;
  /** 가게 주소 */
  address: string;
  /** 가게 카테고리 */
  category: string;
}

export interface StoreDto {
  regionId: number;
  name: string;
  address: string;
  category: string;
}

export const bodyToStore = (
  regionId: number,
  body: StoreRequest
): StoreDto => {
  if (!regionId) {
    throw new Error("지역 ID가 올바르지 않습니다.");
  }

  if (!body.name || !body.address || !body.category) {
    throw new Error("가게 이름, 주소, 카테고리는 필수입니다.");
  }

  return {
    regionId,
    name: body.name,
    address: body.address,
    category: body.category,
  };
};