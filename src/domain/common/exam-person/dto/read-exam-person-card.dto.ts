import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadExamDto } from '../../exam/dto/read-exam.dto';
import { ReadPersonalDto } from '../../personal/dto/read-personal.dto';
import { ReadVolunteerInfoDto } from '../../volunteer-info/dto/read-volunteer-info.dto';

export class ReadExamPersonCardDto {
    @ApiProperty()
    @AutoMap()
    id: number;

    @ApiProperty()
    @AutoMap()
    examStartTime: Date;

    @ApiProperty()
    @AutoMap()
    examEndTime: Date;

    @ApiProperty()
    @AutoMap()
    score: number;

    @AutoMap()
    @ApiProperty()
    isPresent: boolean;

    @ApiProperty()
    @AutoMap()
    volunteerInfoId: number;
  
    @ApiProperty()
    @AutoMap()
    personalId: number;

    @ApiProperty()
    @AutoMap()
    userName: string;

    @ApiProperty()
    @AutoMap()
    password: string;
    
    @ApiProperty()
    @AutoMap()
    examId: number;

    @ApiProperty({ type: () => ReadVolunteerInfoDto })
    @AutoMap(() => ReadVolunteerInfoDto)
    volunteerInfo: ReadVolunteerInfoDto;

    @ApiProperty({ type: () => ReadPersonalDto })
    @AutoMap(() => ReadPersonalDto)
    personal: ReadPersonalDto;
 
    @ApiProperty({ type: () => ReadExamDto })
    @AutoMap(() => ReadExamDto)
    exam: ReadExamDto;
}


