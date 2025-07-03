import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {Optional} from "@nestjs/common";

export class AssignExamPersonDto {
    @ApiProperty()
    @AutoMap()
    // @Optional()
    userIds: number[];

    // @ApiProperty()
    // @AutoMap()
    // @Optional()
    // personnelIds: number[];

    @ApiProperty()
    @AutoMap()
    examId: number;
}
