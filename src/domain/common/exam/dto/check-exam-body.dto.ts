import {ApiProperty} from "@nestjs/swagger";
import {IsOptional} from "class-validator";

export class CheckExamBodyDto {
    @ApiProperty({required: false})
    @IsOptional()
    update: boolean;
}