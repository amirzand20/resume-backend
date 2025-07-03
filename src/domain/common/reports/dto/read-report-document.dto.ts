import {ApiProperty} from '@nestjs/swagger';
import {AutoMap} from '@automapper/classes';

export class ReadReportDocumentDto {

    @ApiProperty()
    @AutoMap()
    id: number;

    @AutoMap()
    @ApiProperty()
    systemId: number;

    @ApiProperty()
    @AutoMap()
    documentId: string;

    @ApiProperty()
    @AutoMap()
    documentTitle: string;

    @ApiProperty()
    @AutoMap()
    documentName: string;

}
