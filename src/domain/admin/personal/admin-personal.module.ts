import { AdminPersonalController } from "@/domain/admin/personal/admin-personal.controller";
import { PersonalModule } from "@/domain/common/personal/personal.module";
import { Module } from "@nestjs/common";

@Module({
   imports: [PersonalModule],
   controllers: [AdminPersonalController],
})
export class AdminPersonalModule { }
