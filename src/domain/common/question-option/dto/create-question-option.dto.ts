import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import { IsOptional } from "class-validator";
import { CreateQuestionOptionAttachmentDto } from "../../question-option-attachment/dto/create-question-option-attachment.dto";

export class CreateQuestionOptionDto {
    @AutoMap()
    @ApiProperty()
    optionDesc: string;

    @AutoMap()
    @ApiProperty()
    order: number;

    // @AutoMap()
    // @ApiProperty()
    // questionId: number;

    @ApiProperty()
    @AutoMap()
    isCorrect: boolean;

    @AutoMap()
    @ApiProperty({type: [CreateQuestionOptionAttachmentDto]})
    @IsOptional()
    files: CreateQuestionOptionAttachmentDto[];

}
