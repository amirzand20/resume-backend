import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
export class UpdateDescriptiveExamDto {
    @ApiProperty({type:Array<Number>})
    @AutoMap()
    ids: number[];

    @ApiProperty()
    @AutoMap()
    scores: number[];

}
