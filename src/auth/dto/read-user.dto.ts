// import { ReadExamDto } from "@/domain/common/exam/dto/read-exam.dto";
import { ApiProperty } from "@nestjsx/crud/lib/crud";

// Temporary interface
interface ReadExamDto {
    id: number;
    name: string;
}

export class ReadUserDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    exam: ReadExamDto;
}