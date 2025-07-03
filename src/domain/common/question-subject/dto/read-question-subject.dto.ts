import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
export class ReadQuestionSubjectDto {
  @ApiProperty()
  @AutoMap()
  id: number;

  @AutoMap()
  @ApiProperty()
  isParent: boolean;

  @AutoMap()
  @ApiProperty()
  parentId!: number;

  @AutoMap()
  @ApiProperty()
  nsright: number;

  @AutoMap()
  @ApiProperty()
  nsleft: number;

  @ApiProperty()
  @AutoMap()
  title: string;

  // @AutoMap(() => ReadQuestionSubjectDto)
  // @ApiProperty({ type: () => ReadQuestionSubjectDto })
  // parent: ReadQuestionSubjectDto;

  @AutoMap(() => [ReadQuestionSubjectDto])
  @ApiProperty({ type: [ReadQuestionSubjectDto] })
  children: ReadQuestionSubjectDto[];
}
