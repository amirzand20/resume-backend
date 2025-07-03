import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import {QuestionSubject} from "@/entities/question-subject.entity";

export class QuestionSubjectRepository extends TreeRepository<QuestionSubject> {
  constructor(
    @InjectRepository(QuestionSubject)
    private readonly repository: TreeRepository<QuestionSubject>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }

  findById(id: number) {
    const query = this.repository
      .createQueryBuilder('questionSubject')
      .leftJoinAndSelect('questionSubject.children', 'child')
      .orderBy('questionSubject.nsleft', 'ASC')
      .where('questionSubject.id = :id', { id: id });

    return query.getOne();
  }

  getAllChild(id: number) {
    const query = this.repository
      .createQueryBuilder('questionSubject')
      .leftJoinAndSelect('questionSubject.children', 'child')
      .orderBy('questionSubject.nsleft', 'ASC')
      .where('questionSubject.parentId = :id', { id: id });

    return query.getManyAndCount();
  }
}
