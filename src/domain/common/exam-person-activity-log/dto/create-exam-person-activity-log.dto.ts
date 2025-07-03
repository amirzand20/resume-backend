import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamPersonActivityLogDto {
  @ApiProperty()
  @AutoMap()
  volunteerInfoId: number;

  @ApiProperty()
  @AutoMap()
  personnelId: number;

  @ApiProperty()
  @AutoMap()
  examId: number;
}
