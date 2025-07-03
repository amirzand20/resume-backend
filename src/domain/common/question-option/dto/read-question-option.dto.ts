import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadQuestionOptionAttachmentDto } from '@/domain/common/question-option-attachment/dto/read-question-option-attachment.dto';
import { ReadPublicQuestionOptionDto } from './read-public-question-option.dto';

export class ReadQuestionOptionDto extends ReadPublicQuestionOptionDto {
  @ApiProperty()
  @AutoMap()
  isCorrect: boolean;
}
