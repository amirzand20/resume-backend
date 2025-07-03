import { Module } from '@nestjs/common';
import { WebExamPersonController } from "@/domain/web/exam-person/web-exam-person.controller";
import { ExamPersonModule } from '@/domain/common/exam-person/exam-person.module';

@Module({
    imports: [ExamPersonModule],
    controllers: [WebExamPersonController],
})
export class WebExamPersonModule {
}
