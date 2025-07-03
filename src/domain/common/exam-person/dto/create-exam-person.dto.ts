import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExamPersonDto {
  @ApiProperty()
  @AutoMap()
  volunteerInfoId: number;

  @ApiProperty()
  @AutoMap()
  personalId: number;

  @ApiProperty()
  @AutoMap()
  examId: number;

  @ApiProperty()
  @AutoMap()
  userName: string;

  @ApiProperty()
  @AutoMap()
  password: string;

  @ApiProperty()
  @AutoMap()
  examStartTime?: Date;

  @ApiProperty()
  @AutoMap()
  examEndTime?: Date;

  @ApiProperty()
  @AutoMap()
  score: number;

  @AutoMap()
  @ApiProperty({ default: false })
  isPresent: boolean;
}
