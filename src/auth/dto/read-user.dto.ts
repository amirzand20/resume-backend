import { ReadExamDto } from "@/domain/common/exam/dto/read-exam.dto";
import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class ReadUserDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    exam: ReadExamDto;
}