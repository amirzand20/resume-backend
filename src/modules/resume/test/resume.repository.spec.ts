import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ResumeRepository } from '../infrastructure/resume.repository';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto } from '../domain/resume-search.dto';

// Create mock query builder that can be chained
const createMockQueryBuilder = () => {
  const queryBuilder: Partial<SelectQueryBuilder<Person>> = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
    getManyAndCount: jest.fn().mockImplementation(() => Promise.resolve([[new Person()], 1])),
  };
  return queryBuilder as SelectQueryBuilder<Person>;
};

describe('ResumeRepository', () => {
  let repository: ResumeRepository;
  let personRepository: Repository<Person>;
  let educationRepository: Repository<Education>;
  let experienceRepository: Repository<Experience>;
  let skillRepository: Repository<Skill>;
  let certificateRepository: Repository<Certificate>;
  let languageRepository: Repository<LanguageInfo>;
  let additionalInfoRepository: Repository<AdditionalInformation>;
  let mockQueryBuilder: SelectQueryBuilder<Person>;

  beforeEach(async () => {
    mockQueryBuilder = createMockQueryBuilder();
    
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeRepository,
        {
          provide: getRepositoryToken(Person),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue(mockQueryBuilder),
          },
        },
        {
          provide: getRepositoryToken(Education),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Experience),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Skill),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Certificate),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(LanguageInfo),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(AdditionalInformation),
          useValue: {
            findOne: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ResumeRepository>(ResumeRepository);
    personRepository = module.get<Repository<Person>>(getRepositoryToken(Person));
    educationRepository = module.get<Repository<Education>>(getRepositoryToken(Education));
    experienceRepository = module.get<Repository<Experience>>(getRepositoryToken(Experience));
    skillRepository = module.get<Repository<Skill>>(getRepositoryToken(Skill));
    certificateRepository = module.get<Repository<Certificate>>(getRepositoryToken(Certificate));
    languageRepository = module.get<Repository<LanguageInfo>>(getRepositoryToken(LanguageInfo));
    additionalInfoRepository = module.get<Repository<AdditionalInformation>>(getRepositoryToken(AdditionalInformation));
    
    // Reset all mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('findPersonById', () => {
    it('should find a person by ID with all relations', async () => {
      // Arrange
      const personId = 1;
      const mockPerson = new Person();
      mockPerson.id = personId;
      
      jest.spyOn(personRepository, 'findOne').mockResolvedValue(mockPerson);

      // Act
      const result = await repository.findPersonById(personId);

      // Assert
      expect(result).toBe(mockPerson);
      expect(personRepository.findOne).toHaveBeenCalledWith({
        where: { id: personId },
        relations: expect.arrayContaining([
          'educations',
          'experiences',
          'skills',
          'certificates',
          'languageInfos',
          'additionalInformations',
          'contactInfos',
          'documents',
        ]),
      });
    });
  });

  describe('searchResumes', () => {
    it('should search resumes with name filter', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'John',
        page: 1,
        limit: 10
      };
      
      const mockPerson = new Person();
      mockPerson.id = 1;
      mockPerson.first_name = 'John';
      
      const mockData = [mockPerson];
      const mockTotal = 1;
      
      (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await repository.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: mockData,
        total: mockTotal
      });
      
      expect(personRepository.createQueryBuilder).toHaveBeenCalledWith('person');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(6);
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(person.first_name LIKE :name OR person.last_name LIKE :name)',
        { name: '%John%' }
      );
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0); // (page - 1) * limit = 0
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
    });

    it('should apply multiple filters when provided', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'John',
        birthPlaceId: 123,
        skills: 'JavaScript',
        education: 'Computer Science',
        page: 2,
        limit: 5
      };
      
      const mockData = [new Person()];
      const mockTotal = 10;
      
      (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await repository.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: mockData,
        total: mockTotal
      });
      
      expect(personRepository.createQueryBuilder).toHaveBeenCalledWith('person');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(6);
      
      // Verify each filter was applied
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(person.first_name LIKE :name OR person.last_name LIKE :name)',
        { name: '%John%' }
      );
      
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'person.birth_place_id = :birthPlaceId',
        { birthPlaceId: 123 }
      );
      
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        'skill.name LIKE :skills',
        { skills: '%JavaScript%' }
      );
      
      expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
        '(education.university LIKE :education OR education.major LIKE :education OR education.degree_level LIKE :education)',
        { education: '%Computer Science%' }
      );
      
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(5); // (page - 1) * limit = 5
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(5);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
    });

    it('should not apply filters that are not provided', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        page: 1,
        limit: 10
      };
      
      const mockData = [new Person(), new Person()];
      const mockTotal = 2;
      
      (mockQueryBuilder.getManyAndCount as jest.Mock).mockResolvedValueOnce([mockData, mockTotal]);

      // Act
      const result = await repository.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: mockData,
        total: mockTotal
      });
      
      expect(personRepository.createQueryBuilder).toHaveBeenCalledWith('person');
      expect(mockQueryBuilder.leftJoinAndSelect).toHaveBeenCalledTimes(6);
      
      // Verify no filters were applied
      expect(mockQueryBuilder.andWhere).not.toHaveBeenCalled();
      
      expect(mockQueryBuilder.skip).toHaveBeenCalledWith(0);
      expect(mockQueryBuilder.take).toHaveBeenCalledWith(10);
      expect(mockQueryBuilder.getManyAndCount).toHaveBeenCalled();
    });
  });
}); 