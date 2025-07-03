import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ExamPersonActivityLog } from '@/entities/exam-person-activity-log.entity';

export class ExamPersonActivityLogRepository extends Repository<ExamPersonActivityLog> {
  constructor(
    @InjectRepository(ExamPersonActivityLog)
    private readonly repository: Repository<ExamPersonActivityLog>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
