import { ReportDocument } from '@/entities/report-document.entity';
import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateReportDocumentDto } from './dto/create-report-document.dto';
import { ReadReportDocumentDto } from './dto/read-report-document.dto';

@Injectable()
export class ReportsProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, ReportDocument, ReadReportDocumentDto);
            createMap(mapper, ReadReportDocumentDto, ReportDocument);
            createMap(mapper, CreateReportDocumentDto, ReportDocument);

        };
    }
}
