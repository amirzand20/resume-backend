import {PartialType} from "@nestjs/swagger";import { CreateSystemBaseItemDto } from "./create-system-base-item-dto";
;

export class UpdateSystemBaseItemDto extends PartialType(CreateSystemBaseItemDto) {}
