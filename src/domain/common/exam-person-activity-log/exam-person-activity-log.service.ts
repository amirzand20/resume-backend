import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { ExamPersonActivityLogRepository } from './exam-person-activity-log.repository';
import { ExamPersonActivityLog } from '@/entities/exam-person-activity-log.entity';
import { CreateExamPersonActivityLogDto } from './dto/create-exam-person-activity-log.dto';
import { ReadExamPersonActivityLogDto } from './dto/read-exam-person-activity-log.dto';
import { OperationNotSuccessfulException } from '@/common/utils/exception';

@Injectable()
export class ExamPersonActivityLogService extends TypeOrmCrudService<ExamPersonActivityLog> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly repository: ExamPersonActivityLogRepository,
  ) {
    super(repository);
  }

  async loginLog(
    data: CreateExamPersonActivityLogDto,
  ): Promise<ReadExamPersonActivityLogDto> {
    const log = this.mapper.map(
      data,
      CreateExamPersonActivityLogDto,
      ExamPersonActivityLog,
    );
    const instance = await this.repository.save(log);
    if (instance.id > 0)
      return this.mapper.map(
        instance,
        ExamPersonActivityLog,
        ReadExamPersonActivityLogDto,
      );
    throw new OperationNotSuccessfulException();
  }
}
