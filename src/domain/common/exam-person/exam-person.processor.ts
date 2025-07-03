import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { ExamPersonRepository } from './exam-person.repository';
import { PersonalRepository } from '../personal/personal.repository';
import { IsNull } from 'typeorm';

@Processor('cardProcessor')
export class ExamPersonProcessor extends WorkerHost {
  constructor(
    private examPersonRepository: ExamPersonRepository,
    private personalRepository: PersonalRepository,
  ) {
    super();
  }
  async process(job: Job) {
    const data = job.data;
    const { examId, organId, includeVols } = data;
    const chunkCount = 1000;
    await this.examPersonRepository.delete({
      userName: IsNull(),
      examId: data.examId,
    });
    // const psersonnelCount = await this.examPersonRepository.getPersonnelCount(
    //   data.examId,
    // );
    // const categores = Math.min(Math.ceil(psersonnelCount / chunkCount), 4);
    // for (let i = 0; i < categores; i++) {
    let personnelBatches = 0;
    let psersonnelCount = 0;
    while (true) {
      const pList = await this.examPersonRepository.getPersonnelForExam(
        examId,
        chunkCount,
        organId,
      );
      if (!pList?.length) break;
      personnelBatches += 1;
      psersonnelCount += pList.length;
      await this.examPersonRepository.createExamPerson(examId, pList, true);
    }
    let volunteersbatches = 0;
    let volunteersCount = 0;
    if (includeVols) {
      while (true) {
        const vList = await this.examPersonRepository.getVolunteersForExam(
          data.examId,
          chunkCount,
        );
        if (!vList?.length) break;
        volunteersbatches += 1;
        volunteersCount += vList.length;
        await this.examPersonRepository.createExamPerson(
          data.examId,
          vList,
          false,
        );
      }
    }
    // }

    return {
      success: true,
      psersonnelCount,
      volunteersbatches,
      personnelBatches,
      volunteersCount,
      includeVols,
    };
  }
  @OnWorkerEvent('completed')
  onCompleted(job: Job, result: any) {
    console.log('JobFinished', result);
  }
  @OnWorkerEvent('failed')
  onFailed(job: Job, e: Error) {
    console.log('Job Failed', e);
  }
}
