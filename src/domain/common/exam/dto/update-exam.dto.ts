import {PartialType} from "@nestjs/swagger";
import {CreateExamDto} from "@/domain/common/exam/dto/create-exam.dto";

export class UpdateExamDto extends PartialType(CreateExamDto) {}
