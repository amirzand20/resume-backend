import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organ } from '@/entities/organ.entity';
import { OrganOperational } from '@/entities/organ-operational.entity';
import { OrganPost } from '@/entities/organ-post.entity';
import { OrganProperty } from '@/entities/organ-property.entity';
import { OrganService } from '@/domain/common/organ/organ.service';
import { OrganProfile } from '@/domain/common/organ/organ.profile';
import { OrganRepository } from '@/domain/common/organ/organ.repository';
import { OrganOperationalRepository } from '@/domain/common/organ-operational/organ-operational.repository';
import { OrganPostRepository } from '@/domain/common/organ-post/organ-post.repository';
import { TreeRepository } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Organ,
      OrganOperational,
      OrganPost,
      OrganProperty,
    ]),
  ],
  providers: [
    OrganService,
    OrganProfile,
    OrganRepository,
    OrganOperationalRepository,
    OrganPostRepository,
    TreeRepository,
  ],
  exports: [OrganRepository, OrganService],
})
export class OrganModule {}
