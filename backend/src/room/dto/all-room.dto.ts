// DTO 클래스 정의
import { Transform } from "class-transformer";
import { IsBoolean, IsOptional } from "class-validator";

export class AllRoomQueryParamDto {
    @IsOptional()
    @Transform(({ value }) => {
        if (value === "true") return true;
        if (value === "false") return false;
        return value;
    })
    @IsBoolean()
    inProgress: boolean;
}
