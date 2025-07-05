import { ApiProperty } from '@nestjs/swagger';

export class ReadLanguageInfoDto {
  @ApiProperty({ description: 'Language Info ID' })
  id: number;

  @ApiProperty({ description: 'Person ID' })
  personId: number;

  @ApiProperty({ description: 'Language ID' })
  languageId: number;

  @ApiProperty({ description: 'Reading Level ID' })
  readingLevelId: number;

  @ApiProperty({ description: 'Writing Level ID' })
  writingLevelId: number;

  @ApiProperty({ description: 'Conversation Level ID' })
  conversationLevelId: number;

  @ApiProperty({ description: 'Comment' })
  comment: number;

  @ApiProperty({ description: 'Table ID' })
  tableId: string;

  @ApiProperty({ description: 'Created Method ID' })
  createdMethodId: number;

  @ApiProperty({ description: 'Created Date' })
  createdDate: Date;

  @ApiProperty({ description: 'Modified Date' })
  modifiedDate: Date;

  @ApiProperty({ description: 'Created By' })
  createdBy: number;

  @ApiProperty({ description: 'Modified By' })
  modifiedBy: number;
} 