import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    NotFoundException,
    Query,
    UseGuards,
    Request
} from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiParam,
    ApiBody,
    ApiQuery,
    ApiOAuth2,
    ApiBearerAuth
} from '@nestjs/swagger';
import {ResumeService} from '../application/resume.service';
import {Person} from '../../../entity/Person.entity';
import {Education} from '../../../entity/education.entity';
import {Experience} from '../../../entity/experience.entity';
import {Skill} from '../../../entity/skill.entity';
import {ResumeSearchDto, ResumeSearchResponseDto} from '../domain/resume-search.dto';
import {JwtAuthGuard} from 'src/shared/guards/jwt-auth.guard';
import {ResumeDto} from '../domain/dto/resume.dto';

@ApiTags('resume')
@Controller('resume')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('jwt-auth')
export class ResumeController {
    constructor(private readonly resumeService: ResumeService) {
    }

    @Get('search')
    @ApiOperation({summary: 'Search for resumes with optional filters'})
    @ApiQuery({name: 'name', required: false, description: 'Search by name (first or last name)'})
    @ApiQuery({name: 'birthPlaceId', required: false, description: 'Filter by birth place ID'})
    @ApiQuery({name: 'locationPlaceId', required: false, description: 'Filter by location place ID'})
    @ApiQuery({name: 'sexId', required: false, description: 'Filter by sex ID'})
    @ApiQuery({name: 'skills', required: false, description: 'Search by skills'})
    @ApiQuery({name: 'education', required: false, description: 'Search by education'})
    @ApiQuery({name: 'experience', required: false, description: 'Search by experience'})
    @ApiQuery({name: 'language', required: false, description: 'Search by language'})
    @ApiQuery({name: 'page', required: false, description: 'Page number for pagination', type: Number, example: 1})
    @ApiQuery({name: 'limit', required: false, description: 'Items per page for pagination', type: Number, example: 10})
    @ApiResponse({
        status: 200,
        description: 'Returns the search results',
        type: ResumeSearchResponseDto,
    })
    async searchResumes(@Query() searchParams: ResumeSearchDto): Promise<ResumeSearchResponseDto> {
        return this.resumeService.searchResumes(searchParams);
    }

    @Get(':personId')
    @ApiOperation({summary: 'Get resume by person ID'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiResponse({
        status: 200,
        description: 'Returns the resume',
        type: Person,
    })
    async getResume(@Param('personId') personId: number): Promise<Person> {
        return this.resumeService.getResumeById(personId);
    }


    @Put(':personId/personal-info')
    @ApiOperation({summary: 'Update personal information'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiBody({type: Person})
    @ApiResponse({
        status: 200,
        description: 'Personal information updated successfully',
        type: Person,
    })
    async updatePersonalInfo(
        @Param('personId') personId: number,
        @Body() personalInfo: Partial<Person>,
    ): Promise<Person> {
        return this.resumeService.updatePersonalInfo(personId, personalInfo);
    }


    @Post(':personId/education')
    @ApiOperation({summary: 'Add education'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiBody({type: Education})
    @ApiResponse({
        status: 201,
        description: 'Education added successfully',
        type: Education,
    })
    async addEducation(
        @Param('personId') personId: number,
        @Body() education: Partial<Education>,
    ): Promise<Education> {
        return this.resumeService.addEducation(personId, education);
    }


    @Put('education/:educationId')
    @ApiOperation({summary: 'Update education'})
    @ApiParam({name: 'educationId', description: 'Education ID'})
    @ApiBody({type: Education})
    @ApiResponse({
        status: 200,
        description: 'Education updated successfully',
        type: Education,
    })
    async updateEducation(
        @Param('educationId') educationId: number,
        @Body() education: Partial<Education>,
    ): Promise<Education> {
        return this.resumeService.updateEducation(educationId, education);
    }


    @Delete('education/:educationId')
    @ApiOperation({summary: 'Delete education'})
    @ApiParam({name: 'educationId', description: 'Education ID'})
    @ApiResponse({
        status: 200,
        description: 'Education deleted successfully',
    })
    async deleteEducation(@Param('educationId') educationId: number): Promise<void> {
        return this.resumeService.deleteEducation(educationId);
    }


    @Post(':personId/experience')
    @ApiOperation({summary: 'Add experience'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiBody({type: Experience})
    @ApiResponse({
        status: 201,
        description: 'Experience added successfully',
        type: Experience,
    })
    async addExperience(
        @Param('personId') personId: number,
        @Body() experience: Partial<Experience>,
    ): Promise<Experience> {
        return this.resumeService.addExperience(personId, experience);
    }


    @Put('experience/:experienceId')
    @ApiOperation({summary: 'Update experience'})
    @ApiParam({name: 'experienceId', description: 'Experience ID'})
    @ApiBody({type: Experience})
    @ApiResponse({
        status: 200,
        description: 'Experience updated successfully',
        type: Experience,
    })
    async updateExperience(
        @Param('experienceId') experienceId: number,
        @Body() experience: Partial<Experience>,
    ): Promise<Experience> {
        return this.resumeService.updateExperience(experienceId, experience);
    }


    @Delete('experience/:experienceId')
    @ApiOperation({summary: 'Delete experience'})
    @ApiParam({name: 'experienceId', description: 'Experience ID'})
    @ApiResponse({
        status: 200,
        description: 'Experience deleted successfully',
    })
    async deleteExperience(@Param('experienceId') experienceId: number): Promise<void> {
        return this.resumeService.deleteExperience(experienceId);
    }


    @Post(':personId/skill')
    @ApiOperation({summary: 'Add skill'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiBody({type: Skill})
    @ApiResponse({
        status: 201,
        description: 'Skill added successfully',
        type: Skill,
    })
    async addSkill(
        @Param('personId') personId: number,
        @Body() skill: Partial<Skill>,
    ): Promise<Skill> {
        return this.resumeService.addSkill(personId, skill);
    }


    @Put('skill/:skillId')
    @ApiOperation({summary: 'Update skill'})
    @ApiParam({name: 'skillId', description: 'Skill ID'})
    @ApiBody({type: Skill})
    @ApiResponse({
        status: 200,
        description: 'Skill updated successfully',
        type: Skill,
    })
    async updateSkill(
        @Param('skillId') skillId: number,
        @Body() skill: Partial<Skill>,
    ): Promise<Skill> {
        return this.resumeService.updateSkill(skillId, skill);
    }


    @Delete('skill/:skillId')
    @ApiOperation({summary: 'Delete skill'})
    @ApiParam({name: 'skillId', description: 'Skill ID'})
    @ApiResponse({
        status: 200,
        description: 'Skill deleted successfully',
    })
    async deleteSkill(@Param('skillId') skillId: number): Promise<void> {
        return this.resumeService.deleteSkill(skillId);
    }


    @Post(':personId/publish')
    @ApiOperation({summary: 'Publish resume'})
    @ApiParam({name: 'personId', description: 'Person ID'})
    @ApiResponse({
        status: 200,
        description: 'Resume published successfully',
        type: Boolean,
    })
    async publishResume(@Param('personId') personId: number): Promise<boolean> {
        return this.resumeService.publishResume(personId);
    }

    @Post('save')


    @ApiOperation({summary: 'Save a complete resume for the user'})
    @ApiResponse({status: 201, description: 'Resume saved successfully'})
    @ApiResponse({status: 400, description: 'Bad Request'})
    async saveResume(@Body() resumeDto: ResumeDto, @Request() req) {
        try {
            const result = await this.resumeService.saveResume(resumeDto, req.user.id);
            return {message: 'Resume saved successfully', personId: result.personId, color: 'green'};
        } catch (error) {
            return {message: error.message, color: 'red'};
        }
    }

    @Get('user/resumes')
    @ApiOperation({ summary: 'Get all resumes for the current user' })
    @ApiResponse({
        status: 200,
        description: 'Returns all resumes for the user',
        type: [Person],
    })
    @ApiResponse({
        status: 404,
        description: 'No resumes found for the user',
    })
    async getUserResumes(@Request() req): Promise<Person[]> {
        return this.resumeService.getUserResumes(req.user.id);
    }
} 