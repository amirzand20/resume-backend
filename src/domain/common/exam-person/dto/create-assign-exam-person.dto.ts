import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';

export class CreateAssignExamPersonDto {
    @ApiProperty()
    @AutoMap()
    volunteerInfoId: number;

    @ApiProperty()
    @AutoMap()
    examId: number;
}
