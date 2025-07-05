import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeTest } from '@/entities/employee-test.entity';
import { EmployeeTestRepository } from './employee-test.repository';
import { EmployeeTestService } from './employee-test.service';
import { EmployeeTestController } from './employee-test.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([EmployeeTest]),
  ],
  controllers: [EmployeeTestController],
  providers: [
    EmployeeTestRepository,
    EmployeeTestService,
  ],
  exports: [EmployeeTestRepository, EmployeeTestService],
})
export class EmployeeTestModule {} 