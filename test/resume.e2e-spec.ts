import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Person } from '../src/entity/Person.entity';
import { Education } from '../src/entity/education.entity';
import { Experience } from '../src/entity/experience.entity';
import { Skill } from '../src/entity/skill.entity';
import { Certificate } from '../src/entity/certificate.entity';
import { LanguageInfo } from '../src/entity/language-info.entity';
import { AdditionalInformation } from '../src/entity/additional-information.entity';

describe('ResumeController (e2e)', () => {
  let app: INestApplication;
  let mockPersonRepository;
  let mockEducationRepository;
  let mockExperienceRepository;
  let mockSkillRepository;

  const mockPerson1 = {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    national_no: '1234567890',
    birth_date: new Date('1990-01-01'),
    birth_place_id: 1,
    sex_id: 1,
    mobile_number: '123456789',
    created_date: new Date(),
    educations: [],
    experiences: [],
    skills: [],
  };

  const mockPerson2 = {
    id: 2,
    first_name: 'Jane',
    last_name: 'Smith',
    national_no: '0987654321',
    birth_date: new Date('1992-05-15'),
    birth_place_id: 2,
    sex_id: 2,
    mobile_number: '987654321',
    created_date: new Date(),
    educations: [],
    experiences: [],
    skills: [],
  };

  beforeEach(async () => {
    // Create mock repositories
    mockPersonRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[mockPerson1, mockPerson2], 2]),
      })),
    };

    mockEducationRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockExperienceRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    mockSkillRepository = {
      findOne: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Person))
      .useValue(mockPersonRepository)
      .overrideProvider(getRepositoryToken(Education))
      .useValue(mockEducationRepository)
      .overrideProvider(getRepositoryToken(Experience))
      .useValue(mockExperienceRepository)
      .overrideProvider(getRepositoryToken(Skill))
      .useValue(mockSkillRepository)
      .overrideProvider(getRepositoryToken(Certificate))
      .useValue({
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(LanguageInfo))
      .useValue({
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      })
      .overrideProvider(getRepositoryToken(AdditionalInformation))
      .useValue({
        findOne: jest.fn(),
        save: jest.fn(),
        delete: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/resume/search (GET)', () => {
    it('should return search results with no filters', () => {
      return request(app.getHttpServer())
        .get('/resume/search')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total', 2);
          expect(res.body).toHaveProperty('page', 1);
          expect(res.body).toHaveProperty('limit', 10);
          expect(res.body).toHaveProperty('pageCount', 1);
          expect(res.body.data).toHaveLength(2);
          expect(res.body.data[0].id).toBe(mockPerson1.id);
          expect(res.body.data[1].id).toBe(mockPerson2.id);
        });
    });

    it('should apply name filter when provided', () => {
      // For this test, we'll mock a different response based on the filter
      mockPersonRepository.createQueryBuilder = jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[mockPerson1], 1]),
      }));

      return request(app.getHttpServer())
        .get('/resume/search?name=John')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total', 1);
          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0].id).toBe(mockPerson1.id);
        });
    });

    it('should apply multiple filters and pagination', () => {
      // Mock specific response for this test
      mockPersonRepository.createQueryBuilder = jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[mockPerson2], 1]),
      }));

      return request(app.getHttpServer())
        .get('/resume/search?name=Jane&birthPlaceId=2&sexId=2&page=1&limit=5')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total', 1);
          expect(res.body).toHaveProperty('page', 1);
          expect(res.body).toHaveProperty('limit', 5);
          expect(res.body).toHaveProperty('pageCount', 1);
          expect(res.body.data).toHaveLength(1);
          expect(res.body.data[0].id).toBe(mockPerson2.id);
        });
    });

    it('should handle empty search results', () => {
      // Mock empty response
      mockPersonRepository.createQueryBuilder = jest.fn(() => ({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getManyAndCount: jest.fn().mockResolvedValue([[], 0]),
      }));

      return request(app.getHttpServer())
        .get('/resume/search?name=NonExistent')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('data');
          expect(res.body).toHaveProperty('total', 0);
          expect(res.body).toHaveProperty('pageCount', 0);
          expect(res.body.data).toHaveLength(0);
        });
    });
  });

  describe('/resume/:personId (GET)', () => {
    it('should return a resume by ID', () => {
      mockPersonRepository.findOne.mockResolvedValue(mockPerson1);

      return request(app.getHttpServer())
        .get('/resume/1')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty('id', mockPerson1.id);
          expect(res.body).toHaveProperty('first_name', mockPerson1.first_name);
          expect(res.body).toHaveProperty('last_name', mockPerson1.last_name);
        });
    });

    it('should return 404 when resume is not found', () => {
      mockPersonRepository.findOne.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/resume/999')
        .expect(404);
    });
  });
}); 