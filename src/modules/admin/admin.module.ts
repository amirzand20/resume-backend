import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './presentation/admin.controller';
import { AdminService } from './application/admin.service';
import { AdminRepository } from './infrastructure/admin.repository';
import { Person } from '../../entity/Person.entity';
import { Education } from '../../entity/education.entity';
import { Experience } from '../../entity/experience.entity';
import { Skill } from '../../entity/skill.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Person,
      Education,
      Experience,
      Skill,
    ]),
  ],
  controllers: [AdminController],
  providers: [
    {
      provide: 'IAdminRepository',
      useClass: AdminRepository,
    },
    {
      provide: AdminService,
      useFactory: (adminRepository) => {
        return new AdminService(adminRepository);
      },
      inject: ['IAdminRepository'],
    },
  ],
  exports: [AdminService],
})
export class AdminModule {} 