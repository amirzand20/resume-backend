import { FileManagerService } from '@/domain/common/file-manager/file-manager.service';
import { OauthClientModule } from '@/external-client/oauth-client/oauth-client.module';
import { OauthClientService } from '@/external-client/oauth-client/oauth-client.service';
import { PayrollModule } from '@/external-client/payroll/payroll.module';
import { PayrollService } from '@/external-client/payroll/payroll.service';
import { WorkflowModule } from '@/external-client/workflow/workflow.module';
import { WorkflowService } from '@/external-client/workflow/workflow.service';
import { HttpClientModule } from '@/http-client/http-client.module';
import { HttpClientService } from '@/http-client/http-client.service';
import { Module } from '@nestjs/common';

import { EmploymentModule } from './employment/employment.module';
import { ExcelModule } from './excel/excel.module';
import { ExcelService } from './excel/excel.service';

@Module({
  imports: [
    HttpClientModule,
    WorkflowModule,
    PayrollModule,
    OauthClientModule,
    ExcelModule,
    EmploymentModule,
  ],
  providers: [
    HttpClientService,
    PayrollService,
    WorkflowService,
    FileManagerService,
    OauthClientService,
    ExcelService,
  ],
  exports: [],
})
export class ExternalClientModule {}
