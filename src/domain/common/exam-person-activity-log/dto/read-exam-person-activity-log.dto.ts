import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadVolunteerInfoDto } from '../../volunteer-info/dto/read-volunteer-info.dto';
import { ReadPersonalDto } from '../../personal/dto/read-personal.dto';
import { ReadExamDto } from '../../exam/dto/read-exam.dto';

export class ReadExamPersonActivityLogDto {
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @ApiProperty()
  @AutoMap()
  volunteerInfoId: number;

  @ApiProperty()
  @AutoMap()
  volunteerInfo: ReadVolunteerInfoDto;

  @ApiProperty()
  @AutoMap()
  personalId: number;

  @ApiProperty()
  @AutoMap()
  personal: ReadPersonalDto;

  @ApiProperty()
  @AutoMap()
  examId: number;

  @ApiProperty()
  @AutoMap()
  exam: ReadExamDto;

  @ApiProperty()
  @AutoMap()
  loginDate: Date;

  @ApiProperty()
  @AutoMap()
  createdDate: Date;
}
