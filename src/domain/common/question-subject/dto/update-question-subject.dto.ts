import { AutoMap } from '@automapper/classes';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateQuestionSubjectDto } from './create-question-subject.dto';

export class UpdateQuestionSubjectDto extends PartialType(
  CreateQuestionSubjectDto,
) {
  @ApiProperty()
  @AutoMap()
  id: number;
}
