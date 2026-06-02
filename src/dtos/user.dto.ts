export interface UpdateMyInfoRequest {
  name?: string;
  gender?: string;
  birth?: string;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
}

export interface UpdateMyInfoDto {
  name?: string;
  gender?: string;
  birth?: Date;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
}

export const bodyToUpdateMyInfo = (
  body: UpdateMyInfoRequest
): UpdateMyInfoDto => {
  const updateData: UpdateMyInfoDto = {};

  if (body.name !== undefined) updateData.name = body.name;
  if (body.gender !== undefined) updateData.gender = body.gender;
  if (body.address !== undefined) updateData.address = body.address;
  if (body.detailAddress !== undefined) updateData.detailAddress = body.detailAddress;
  if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;

  if (body.birth !== undefined) {
    const birthDate = new Date(body.birth);

    if (Number.isNaN(birthDate.getTime())) {
      throw new Error("생년월일 형식이 올바르지 않습니다. 예: 2001-03-31");
    }

    updateData.birth = birthDate;
  }

  if (Object.keys(updateData).length === 0) {
    throw new Error("수정할 정보가 없습니다.");
  }

  return updateData;
};
