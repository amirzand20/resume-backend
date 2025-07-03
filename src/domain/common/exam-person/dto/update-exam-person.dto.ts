import { PartialType } from '@nestjs/swagger';
import { CreateExamPersonDto } from './create-exam-person.dto';

export class updateExamPersonDto extends PartialType(CreateExamPersonDto){};