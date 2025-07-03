import { ReportDocument } from '@/entities/report-document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ReportsRepository extends Repository<ReportDocument> {
  constructor(
    @InjectRepository(ReportDocument)
    private readonly repository: Repository<ReportDocument>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
