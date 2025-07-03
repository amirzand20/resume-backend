import {TypeOrmModule} from "@nestjs/typeorm";
import {Module} from "@nestjs/common";
import {SystemBaseItem} from "@/entities/system-base-item.entity";
import {SystemBaseItemRepository} from "@/domain/common/system-base-item/system-base-item.repository";
import {SystemBaseItemService} from "@/domain/common/system-base-item/system-base-item.service";

@Module({
    imports: [TypeOrmModule.forFeature([SystemBaseItem])],
    controllers: [],
    providers: [
        SystemBaseItemRepository,
        SystemBaseItemService,
    ],
    exports: [],
})
export class SystemBaseItemModule {
}
