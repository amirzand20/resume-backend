import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from "@automapper/classes";

export class SelectExamQuestionDto {
    @AutoMap()
    @ApiProperty()
    examId: number;

    @AutoMap()
    @ApiProperty()
    questionIds: number[];
}
