import { Test, TestingModule } from '@nestjs/testing';
import { ResumeService } from '../application/resume.service';
import { IResumeRepository } from '../domain/resume.repository.interface';
import { Person } from '../../../entity/Person.entity';
import { Education } from '../../../entity/education.entity';
import { Experience } from '../../../entity/experience.entity';
import { Skill } from '../../../entity/skill.entity';
import { Certificate } from '../../../entity/certificate.entity';
import { LanguageInfo } from '../../../entity/language-info.entity';
import { AdditionalInformation } from '../../../entity/additional-information.entity';
import { NotFoundException } from '@nestjs/common';
import { ResumeSearchDto } from '../domain/resume-search.dto';

// Mock repository implementation
const mockResumeRepository = {
  findPersonById: jest.fn(),
  savePerson: jest.fn(),
  findEducationById: jest.fn(),
  saveEducation: jest.fn(),
  deleteEducation: jest.fn(),
  findExperienceById: jest.fn(),
  saveExperience: jest.fn(),
  deleteExperience: jest.fn(),
  findSkillById: jest.fn(),
  saveSkill: jest.fn(),
  deleteSkill: jest.fn(),
  findCertificateById: jest.fn(),
  saveCertificate: jest.fn(),
  deleteCertificate: jest.fn(),
  findLanguageById: jest.fn(),
  saveLanguage: jest.fn(),
  deleteLanguage: jest.fn(),
  findAdditionalInfoById: jest.fn(),
  saveAdditionalInfo: jest.fn(),
  deleteAdditionalInfo: jest.fn(),
  searchResumes: jest.fn(),
};

describe('ResumeService', () => {
  let service: ResumeService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResumeService,
        {
          provide: 'IResumeRepository',
          useValue: mockResumeRepository,
        },
      ],
    }).compile();

    service = module.get<ResumeService>(ResumeService);
    repository = module.get('IResumeRepository');
    
    // Reset all mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getResumeById', () => {
    it('should return a resume by person ID', async () => {
      // Arrange
      const personId = 1;
      const mockPerson = new Person();
      mockPerson.id = personId;
      mockPerson.first_name = 'John';
      mockPerson.last_name = 'Doe';
      
      mockResumeRepository.findPersonById.mockResolvedValue(mockPerson);

      // Act
      const result = await service.getResumeById(personId);

      // Assert
      expect(result).toBe(mockPerson);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
    });

    it('should throw NotFoundException when person is not found', async () => {
      // Arrange
      const personId = 999;
      mockResumeRepository.findPersonById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.getResumeById(personId)).rejects.toThrow(NotFoundException);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
    });
  });

  describe('updatePersonalInfo', () => {
    it('should update personal information', async () => {
      // Arrange
      const personId = 1;
      const mockPerson = new Person();
      mockPerson.id = personId;
      mockPerson.first_name = 'John';
      mockPerson.last_name = 'Doe';
      
      const personalInfo: Partial<Person> = {
        first_name: 'John',
        last_name: 'Smith',
      };
      
      const updatedPerson = new Person();
      Object.assign(updatedPerson, mockPerson, personalInfo);
      
      mockResumeRepository.findPersonById.mockResolvedValue(mockPerson);
      mockResumeRepository.savePerson.mockResolvedValue(updatedPerson);

      // Act
      const result = await service.updatePersonalInfo(personId, personalInfo);

      // Assert
      expect(result).toBe(updatedPerson);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
      expect(mockResumeRepository.savePerson).toHaveBeenCalledWith(expect.objectContaining(personalInfo));
    });

    it('should throw NotFoundException when person is not found', async () => {
      // Arrange
      const personId = 999;
      const personalInfo: Partial<Person> = {
        first_name: 'John',
        last_name: 'Smith',
      };
      
      mockResumeRepository.findPersonById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updatePersonalInfo(personId, personalInfo)).rejects.toThrow(NotFoundException);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
      expect(mockResumeRepository.savePerson).not.toHaveBeenCalled();
    });
  });

  describe('addEducation', () => {
    it('should add education to a resume', async () => {
      // Arrange
      const personId = 1;
      const mockPerson = new Person();
      mockPerson.id = personId;
      
      const educationData: Partial<Education> = {};
      
      const newEducation = new Education();
      Object.assign(newEducation, educationData);
      newEducation.person = mockPerson;
      
      mockResumeRepository.findPersonById.mockResolvedValue(mockPerson);
      mockResumeRepository.saveEducation.mockResolvedValue(newEducation);

      // Act
      const result = await service.addEducation(personId, educationData);

      // Assert
      expect(result).toBe(newEducation);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
      expect(mockResumeRepository.saveEducation).toHaveBeenCalledWith(expect.objectContaining({
        person: mockPerson
      }));
    });

    it('should throw NotFoundException when person is not found', async () => {
      // Arrange
      const personId = 999;
      const educationData: Partial<Education> = {};
      
      mockResumeRepository.findPersonById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.addEducation(personId, educationData)).rejects.toThrow(NotFoundException);
      expect(mockResumeRepository.findPersonById).toHaveBeenCalledWith(personId);
      expect(mockResumeRepository.saveEducation).not.toHaveBeenCalled();
    });
  });

  describe('updateEducation', () => {
    it('should update education', async () => {
      // Arrange
      const educationId = 1;
      const existingEducation = new Education();
      existingEducation.id = educationId;
      
      const educationData: Partial<Education> = {};
      
      const updatedEducation = new Education();
      Object.assign(updatedEducation, existingEducation, educationData);
      
      mockResumeRepository.findEducationById.mockResolvedValue(existingEducation);
      mockResumeRepository.saveEducation.mockResolvedValue(updatedEducation);

      // Act
      const result = await service.updateEducation(educationId, educationData);

      // Assert
      expect(result).toBe(updatedEducation);
      expect(mockResumeRepository.findEducationById).toHaveBeenCalledWith(educationId);
      expect(mockResumeRepository.saveEducation).toHaveBeenCalledWith(expect.objectContaining({
        id: educationId
      }));
    });

    it('should throw NotFoundException when education is not found', async () => {
      // Arrange
      const educationId = 999;
      const educationData: Partial<Education> = {};
      
      mockResumeRepository.findEducationById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.updateEducation(educationId, educationData)).rejects.toThrow(NotFoundException);
      expect(mockResumeRepository.findEducationById).toHaveBeenCalledWith(educationId);
      expect(mockResumeRepository.saveEducation).not.toHaveBeenCalled();
    });
  });

  describe('deleteEducation', () => {
    it('should delete education', async () => {
      // Arrange
      const educationId = 1;
      const existingEducation = new Education();
      existingEducation.id = educationId;
      
      mockResumeRepository.findEducationById.mockResolvedValue(existingEducation);
      mockResumeRepository.deleteEducation.mockResolvedValue(undefined);

      // Act
      await service.deleteEducation(educationId);

      // Assert
      expect(mockResumeRepository.findEducationById).toHaveBeenCalledWith(educationId);
      expect(mockResumeRepository.deleteEducation).toHaveBeenCalledWith(educationId);
    });

    it('should throw NotFoundException when education is not found', async () => {
      // Arrange
      const educationId = 999;
      
      mockResumeRepository.findEducationById.mockResolvedValue(null);

      // Act & Assert
      await expect(service.deleteEducation(educationId)).rejects.toThrow(NotFoundException);
      expect(mockResumeRepository.findEducationById).toHaveBeenCalledWith(educationId);
      expect(mockResumeRepository.deleteEducation).not.toHaveBeenCalled();
    });
  });

  // Similar test patterns can be applied for experience, skills, etc.
  // For brevity, we'll focus on testing the search functionality which is more unique

  describe('searchResumes', () => {
    it('should search resumes with filters and return formatted response', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'John',
        skills: 'JavaScript',
        page: 2,
        limit: 5
      };
      
      const mockPerson = new Person();
      mockPerson.id = 1;
      mockPerson.first_name = 'John';
      
      const repositoryResponse = {
        data: [mockPerson],
        total: 11 // Total of 11 results means 3 pages with limit 5
      };
      
      mockResumeRepository.searchResumes.mockResolvedValue(repositoryResponse);

      // Act
      const result = await service.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: repositoryResponse.data,
        total: repositoryResponse.total,
        page: searchParams.page,
        limit: searchParams.limit,
        pageCount: 3 // 11 items with limit 5 = 3 pages
      });
      expect(mockResumeRepository.searchResumes).toHaveBeenCalledWith(searchParams);
    });

    it('should use default pagination values when not provided', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'John'
      };
      
      const mockPerson = new Person();
      mockPerson.id = 1;
      mockPerson.first_name = 'John';
      
      const repositoryResponse = {
        data: [mockPerson],
        total: 1
      };
      
      mockResumeRepository.searchResumes.mockResolvedValue(repositoryResponse);

      // Act
      const result = await service.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: repositoryResponse.data,
        total: repositoryResponse.total,
        page: 1, // Default page
        limit: 10, // Default limit
        pageCount: 1 // 1 item with limit 10 = 1 page
      });
      expect(mockResumeRepository.searchResumes).toHaveBeenCalledWith(searchParams);
    });

    it('should handle empty results correctly', async () => {
      // Arrange
      const searchParams: ResumeSearchDto = {
        name: 'NonExistentName'
      };
      
      const repositoryResponse = {
        data: [],
        total: 0
      };
      
      mockResumeRepository.searchResumes.mockResolvedValue(repositoryResponse);

      // Act
      const result = await service.searchResumes(searchParams);

      // Assert
      expect(result).toEqual({
        data: [],
        total: 0,
        page: 1,
        limit: 10,
        pageCount: 0 // 0 items = 0 pages
      });
      expect(mockResumeRepository.searchResumes).toHaveBeenCalledWith(searchParams);
    });
  });
}); 