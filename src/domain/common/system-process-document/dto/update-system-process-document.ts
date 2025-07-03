import {PartialType} from "@nestjs/swagger";import { CreateSystemProcessDocumentDto } from "./create-system-process-document";
;

export class UpdateSystemProcessDocumentDto extends PartialType(CreateSystemProcessDocumentDto) {}
