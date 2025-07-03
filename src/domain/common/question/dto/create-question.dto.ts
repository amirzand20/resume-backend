import {ApiProperty} from "@nestjs/swagger";
import {AutoMap} from "@automapper/classes";
import { IsOptional } from "class-validator";
import { CreateQuestionAttachmentDto } from "../../question-attachment/dto/create-question-attachment.dto";
import { CreateQuestionOptionDto } from "../../question-option/dto/create-question-option.dto";

export class CreateQuestionDto  {

    @AutoMap()
    @ApiProperty()
    questionTitle: string;

    // @AutoMap()
    // @ApiProperty()
    // order: number;

    @AutoMap()
    @ApiProperty()
    answerDescription: string;

    @AutoMap()
    @ApiProperty()
    isDescriptive: boolean;

    @ApiProperty()
    @AutoMap()
    difficultyLevelId:number;

    @AutoMap()
    @ApiProperty()
    questionSubjectId: number;

    @AutoMap()
    @ApiProperty({type: [CreateQuestionAttachmentDto]})
    @IsOptional()
    files: CreateQuestionAttachmentDto[];

    @AutoMap()
    @ApiProperty({type: [CreateQuestionOptionDto]})
    @IsOptional()
    options: CreateQuestionOptionDto[];
    
}
