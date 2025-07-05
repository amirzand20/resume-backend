import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeFieldTest } from '@/entities/employee-field-test.entity';
import { EmployeeFieldTestRepository } from './employee-field-test.repository';
import { EmployeeFieldTestService } from './employee-field-test.service';
import { EmployeeFieldTestController } from './employee-field-test.controller';
import { EmployeeFieldTestProfile } from './employee-field-test.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeFieldTest]),
  ],
  controllers: [EmployeeFieldTestController],
  providers: [
    EmployeeFieldTestRepository,
    EmployeeFieldTestService,
    EmployeeFieldTestProfile,
  ],
  exports: [EmployeeFieldTestRepository, EmployeeFieldTestService],
})
export class EmployeeFieldTestModule {} 