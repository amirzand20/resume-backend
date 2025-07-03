import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { ReadOrganDto } from '../../organ/dto/read-organ.dto';

export class ReadPersonalDto {
  @ApiProperty({ required: false, readOnly: true })
  @AutoMap()
  id: number;

  @AutoMap()
  @ApiProperty()
  nationalNo: string;

  @AutoMap()
  @ApiProperty()
  personalNo: string;

  @AutoMap()
  @ApiProperty()
  firstName: string;

  @AutoMap()
  @ApiProperty()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  fatherName: string;

  @ApiProperty()
  @AutoMap()
  organId: number;

  @ApiProperty({ type: () => ReadOrganDto })
  @AutoMap(() => ReadOrganDto)
  organ: ReadOrganDto;
}
