import {Module} from "@nestjs/common";
import {AdminModule} from "@/domain/admin/admin.module";
import {CommonModule} from "@/domain/common/common.module";
import {WebModule} from "@/domain/web/web.module";


@Module({
    imports: [
        AdminModule,
        WebModule,
        CommonModule
    ],
    providers: [],
    exports: [],
})
export class DomainModule {
}
