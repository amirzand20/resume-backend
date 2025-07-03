import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionSubjectDto {
  @ApiProperty()
  @AutoMap()
  parentId: number;

  @ApiProperty()
  @AutoMap()
  title: string;


}
