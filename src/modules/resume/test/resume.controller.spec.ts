import { Test, TestingModule } from '@nestjs/testing';
import { ResumeController } from '../presentation/resume.controller';
import { ResumeService } from '../application/resume.service';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { ResumeSearchDto, ResumeSearchResponseDto } from '../domain/resume-search.dto';

// Mock service implementation
const mockResumeService = {
  getResumeById: jest.fn(),
  updatePersonalInfo: jest.fn(),
  addEducation: jest.fn(),
  updateEducation: jest.fn(),
  deleteEducation: jest.fn(),
  addExperience: jest.fn(),
  updateExperience: jest.fn(),
  deleteExperience: jest.fn(),
  addSkill: jest.fn(),
  updateSkill: jest.fn(),
  deleteSkill: jest.fn(),
  publishResume: jest.fn(),
  searchResumes: jest.fn(),
};

describe('ResumeController', () => {
  let controller: ResumeController;
  let service: ResumeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResumeController],
      providers: [
        {
          provide: ResumeService,
          useValue: mockResumeService,
        },
      ],
    }).compile();

    controller = module.get<ResumeController>(ResumeController);
    service = module.get<ResumeService>(ResumeService);
    
    // Reset all mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getResume', () => {
    it('should return a resume by personId', async () => {
      // Arrange
      const personId = 1;
      const mockPerson = new Person();
      mockPerson.id = personId;
      mockPerson.first_name = 'John';
      mockPerson.last_name = 'Doe';
      
      mockResumeService.getResumeById.mockResolvedValue(mockPerson);

      // Act
      const result = await controller.getResume(personId);

      // Assert
      expect(result).toBe(mockPerson);
      expect(mockResumeService.getResumeById).toHaveBeenCalledWith(personId);
    });
  });

  describe('updatePersonalInfo', () => {
    it('should update personal information', async () => {
      // Arrange
      const personId = 1;
      const personalInfo: Partial<Person> = {
        first_name: 'John',
        last_name: 'Smith',
      };
      
      const updatedPerson = new Person();
      Object.assign(updatedPerson, { id: personId, ...personalInfo });
      
      mockResumeService.updatePersonalInfo.mockResolvedValue(updatedPerson);

      // Act
      const result = await controller.updatePersonalInfo(personId, personalInfo);

      // Assert
      expect(result).toBe(updatedPerson);
      expect(mockResumeService.updatePersonalInfo).toHaveBeenCalledWith(personId, personalInfo);
    });
  });

  describe('addEducation', () => {
    it('should add education to a resume', async () => {
      // Arrange
      const personId = 1;
      const educationData = {};
      
      const newEducation = new Education();
      Object.assign(newEducation, { id: 1 });
      
      mockResumeService.addEducation.mockResolvedValue(newEducation);

      // Act
      const result = await controller.addEducation(personId, educationData);

      // Assert
      expect(result).toBe(newEducation);
      expect(mockResumeService.addEducation).toHaveBeenCalledWith(personId, educationData);
    });
  });

  describe('updateEducation', () => {
    it('should update education', async () => {
      // Arrange
      const educationId = 1;
      const educationData = {};
      
      const updatedEducation = new Education();
      Object.assign(updatedEducation, { id: educationId });
      
      mockResumeService.updateEducation.mockResolvedValue(updatedEducation);

      // Act
      const result = await controller.updateEducation(educationId, educationData);

      // Assert
      expect(result).toBe(updatedEducation);
      expect(mockResumeService.updateEducation).toHaveBeenCalledWith(educationId, educationData);
    });
  });

  describe('deleteEducation', () => {
    it('should delete education', async () => {
      // Arrange
      const educationId = 1;
      mockResumeService.deleteEducation.mockResolvedValue(undefined);

      // Act
      await controller.deleteEducation(educationId);

      // Assert
      expect(mockResumeService.deleteEducation).toHaveBeenCalledWith(educationId);
    });
  });

  describe('addExperience', () => {
    it('should add experience to a resume', async () => {
      // Arrange
      const personId = 1;
      const experienceData = {};
      
      const newExperience = new Experience();
      Object.assign(newExperience, { id: 1 });
      
      mockResumeService.addExperience.mockResolvedValue(newExperience);

      // Act
      const result = await controller.addExperience(personId, experienceData);

      // Assert
      expect(result).toBe(newExperience);
      expect(mockResumeService.addExperience).toHaveBeenCalledWith(personId, experienceData);
    });
  });

  describe('updateExperience', () => {
    it('should update experience', async () => {
      // Arrange
      const experienceId = 1;
      const experienceData = {};
      
      const updatedExperience = new Experience();
      Object.assign(updatedExperience, { id: experienceId });
      
      mockResumeService.updateExperience.mockResolvedValue(updatedExperience);

      // Act
      const result = await controller.updateExperience(experienceId, experienceData);

      // Assert
      expect(result).toBe(updatedExperience);
      expect(mockResumeService.updateExperience).toHaveBeenCalledWith(experienceId, experienceData);
    });
  });

  describe('deleteExperience', () => {
    it('should delete experience', async () => {
      // Arrange
      const experienceId = 1;
      mockResumeService.deleteExperience.mockResolvedValue(undefined);

      // Act
      await controller.deleteExperience(experienceId);

      // Assert
      expect(mockResumeService.deleteExperience).toHaveBeenCalledWith(experienceId);
    });
  });

  describe('addSkill', () => {
    it('should add skill to a resume', async () => {
      // Arrange
      const personId = 1;
      const skillData = {};
      
      const newSkill = new Skill();
      Object.assign(newSkill, { id: 1 });
      
      mockResumeService.addSkill.mockResolvedValue(newSkill);

      // Act
      const result = await controller.addSkill(personId, skillData);

      // Assert
      expect(result).toBe(newSkill);
      expect(mockResumeService.addSkill).toHaveBeenCalledWith(personId, skillData);
    });
  });

  describe('updateSkill', () => {
    it('should update skill', async () => {
      // Arrange
      const skillId = 1;
      const skillData = {};
      
      const updatedSkill = new Skill();
      Object.assign(updatedSkill, { id: skillId });
      
      mockResumeService.updateSkill.mockResolvedValue(updatedSkill);

      // Act
      const result = await controller.updateSkill(skillId, skillData);

      // Assert
      expect(result).toBe(updatedSkill);
      expect(mockResumeService.updateSkill).toHaveBeenCalledWith(skillId, skillData);
    });
  });

  describe('deleteSkill', () => {
    it('should delete skill', async () => {
      // Arrange
      const skillId = 1;
      mockResumeService.deleteSkill.mockResolvedValue(undefined);

      // Act
      await controller.deleteSkill(skillId);

      // Assert
      expect(mockResumeService.deleteSkill).toHaveBeenCalledWith(skillId);
    });
  });

  describe('publishResume', () => {
    it('should publish a resume', async () => {
      // Arrange
      const personId = 1;
      mockResumeService.publishResume.mockResolvedValue(true);

      // Act
      const result = await controller.publishResume(personId);

      // Assert
      expect(result).toBe(true);
      expect(mockResumeService.publishResume).toHaveBeenCalledWith(personId);
    });
  });

  describe('searchResumes', () => {
    it('should search resumes with optional filters', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'John',
        skills: 'JavaScript',
        page: 1,
        limit: 10
      };
      
      const mockPerson = new Person();
      mockPerson.id = 1;
      mockPerson.first_name = 'John';
      
      const mockResponse: ResumeSearchResponseDto = {
        data: [mockPerson],
        total: 1,
        page: 1,
        limit: 10,
        pageCount: 1
      };
      
      mockResumeService.searchResumes.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.searchResumes(searchParams);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockResumeService.searchResumes).toHaveBeenCalledWith(searchParams);
    });

    it('should search resumes with no filters', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        page: 1,
        limit: 10
      };
      
      const mockPerson1 = new Person();
      mockPerson1.id = 1;
      mockPerson1.first_name = 'John';
      
      const mockPerson2 = new Person();
      mockPerson2.id = 2;
      mockPerson2.first_name = 'Jane';
      
      const mockResponse: ResumeSearchResponseDto = {
        data: [mockPerson1, mockPerson2],
        total: 2,
        page: 1,
        limit: 10,
        pageCount: 1
      };
      
      mockResumeService.searchResumes.mockResolvedValue(mockResponse);

      // Act
      const result = await controller.searchResumes(searchParams);

      // Assert
      expect(result).toBe(mockResponse);
      expect(mockResumeService.searchResumes).toHaveBeenCalledWith(searchParams);
    });
  });
}); 