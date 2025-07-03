import { ExamQuestion } from '@/entities/exam-question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class ExamQuestionRepository extends Repository<ExamQuestion> {
  constructor(
    @InjectRepository(ExamQuestion)
    private readonly repository: Repository<ExamQuestion>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  getQuestionSeriesCountByExamId(id: number) {
    return this.createQueryBuilder('examQuestion')
      .groupBy('examQuestion.series')
      .select([
        'examQuestion.series as series',
        'Count(examQuestion.series) as count',
      ])
      .where('examQuestion.examId = :examId', { examId: id })
      .getRawMany();
  }
  async getQuestionsCountByExamId(examId: number, isDescriptive: boolean) {
    return this.repository.count({
      where: { examId, question: { isDescriptive } },
    });
  }
}
