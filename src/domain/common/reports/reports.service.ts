import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
} from '@/common/utils/exception';
import { ReportDocument } from '@/entities/report-document.entity';
import { FileManagerService } from '@/domain/common/file-manager/file-manager.service';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { CreateReportDocumentDto } from './dto/create-report-document.dto';
import { ReadReportDocumentDto } from './dto/read-report-document.dto';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService extends TypeOrmCrudService<ReportDocument> {
  constructor(
    protected readonly fileManagerService: FileManagerService,
    private readonly repository: ReportsRepository,
    @InjectMapper() readonly mapper: Mapper,
  ) {
    super(repository);
  }

  async getMrtFile(mrtName: string) {
    const fileAddress = `assets/reports-mrt/${mrtName}`;
    const fs = require('fs');
    if (!fs.existsSync(fileAddress))
      throw new NotFoundException('فایل گزارش مورد نظر وجود ندارد');
    return JSON.parse(fs.readFileSync(fileAddress, { encoding: 'utf-8' }));
  }

  async getStreamIdById(id: number) {
    const criteria = { id: id };
    const reportDoc = await this.repository.findOne({ where: criteria });
    if (!reportDoc) throw new RequestedInfoNotFoundException();
    return reportDoc.documentId;
  }

  async create(files, res): Promise<ReadReportDocumentDto> {
    try {
      const result = await this.fileManagerService.uploadFile(files);
      const data = result.data;
      const code = data.statusCode;

      if (code == HttpStatus.CREATED) {
        const reportDoc = new CreateReportDocumentDto();
        reportDoc.documentId = data.data[0].id;
        reportDoc.documentName = data.data[0].fileName;
        reportDoc.systemId = 9;

        const _reportDocument = this.mapper.map(
          reportDoc,
          CreateReportDocumentDto,
          ReportDocument,
        );
        const saveResult = await this.repository.save(_reportDocument);
        if (saveResult.id > 0)
          return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message: 'آپلود فایل با موفقیت انجام شد',
            data: this.mapper.map(
              saveResult,
              ReportDocument,
              ReadReportDocumentDto,
            ),
          });
        else throw new OperationNotSuccessfulException();
      } else {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'آپلود فایل با خطا مواجه شد',
          data: null,
        });
      }
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'آپلود فایل با خطا مواجه شد',
        data: null,
      });
    }
  }
}
