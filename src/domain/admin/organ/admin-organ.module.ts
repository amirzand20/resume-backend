import {Module} from '@nestjs/common';
import {AdminOrganController} from './admin-organ.controller';
import { OrganModule } from '@/domain/common/organ/organ.module';

@Module({
    imports: [OrganModule],
    controllers: [AdminOrganController],
})
export class AdminOrganModule {
}
