import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadQuestionOptionAttachmentDto } from '@/domain/common/question-option-attachment/dto/read-question-option-attachment.dto';
import { ReadQuestionDto } from '../../question/dto/read-question.dto';

export class ReadPublicQuestionOptionDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  optionDesc: string;

  @ApiProperty()
  @AutoMap()
  order: number;

  @AutoMap()
  @ApiProperty({ type: Array<ReadQuestionOptionAttachmentDto> })
  files: ReadQuestionOptionAttachmentDto[];

  // @ApiProperty({ type: () => ReadQuestionDto })
  // @AutoMap(() => ReadQuestionDto)
  // question: ReadQuestionDto;
}
