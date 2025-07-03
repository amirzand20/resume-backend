import {TypeOrmModule} from "@nestjs/typeorm";
import {
    SystemProcessDocumentRepository
} from "@/domain/common/system-process-document/system-process-document.repository";
import {SystemProcessDocumentService} from "@/domain/common/system-process-document/system-process-document.service";
import {Module} from "@nestjs/common";
import {SystemProcessDocument} from "@/entities/system-process-document.entity";

@Module({
    imports: [TypeOrmModule.forFeature([SystemProcessDocument])],
    controllers: [],
    providers: [
        SystemProcessDocumentRepository,
        SystemProcessDocumentService,
    ],
    exports: [],
})
export class SystemProcessDocumentModule {
}
