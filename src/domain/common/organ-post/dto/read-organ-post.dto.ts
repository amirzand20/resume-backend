import {AutoMap} from '@automapper/classes';
import {ApiProperty} from '@nestjs/swagger';
import {ReadBaseInfoItemDto} from "@/domain/common/base-info-item/dto/read-base-info-item.dto";
import {ReadOrganDto} from "@/domain/common/organ/dto/read-organ.dto";

export class ReadOrganPostDto {
    @ApiProperty()
    @AutoMap()
    organId: number;
    @ApiProperty()
    @AutoMap()
    postId: number;
    @ApiProperty()
    @AutoMap()
    priority: number;
    @ApiProperty()
    @AutoMap()
    postTypeId: number;

    @AutoMap(() => ReadBaseInfoItemDto)
    @ApiProperty({type: () => ReadBaseInfoItemDto})
    postType: ReadBaseInfoItemDto;

    @AutoMap(() => ReadOrganDto)
    @ApiProperty({type: () => ReadOrganDto})
    organ: ReadOrganDto;
}
