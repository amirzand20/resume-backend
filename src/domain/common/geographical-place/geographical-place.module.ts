import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeographicalPlace } from '@/entities/geographical-place.entity';
import { GeographicalPlaceService } from '@/domain/common/geographical-place/geographical-place.service';
import { GeographicalPlaceProfile } from '@/domain/common/geographical-place/geographical-place.profile';
import { GeographicalPlaceRepository } from '@/domain/common/geographical-place/geographical-place.repository';
import { TreeRepository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([GeographicalPlace])],
  providers: [
    GeographicalPlaceService,
    GeographicalPlaceProfile,
    GeographicalPlaceRepository,
    TreeRepository,
  ],
  exports: [GeographicalPlaceRepository, GeographicalPlaceService],
})
export class GeographicalPlaceModule {}
