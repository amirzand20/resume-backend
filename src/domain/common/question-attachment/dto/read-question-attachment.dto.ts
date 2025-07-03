import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class ReadQuestionAttachmentDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  // @AutoMap()
  // @ApiProperty()
  // questionId: number;

  // @ApiProperty({type: () => ReadExamQuestionDto})
  // @AutoMap(() => ReadExamQuestionDto)
  // examQuestion: ReadExamQuestionDto;

  @AutoMap()
  @ApiProperty()
  fileName: string;

  @AutoMap()
  @ApiProperty()
  attachmentId: string;
}
