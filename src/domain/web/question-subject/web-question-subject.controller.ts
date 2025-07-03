import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {QuestionSubject} from '@/entities/question-subject.entity';
import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards,} from '@nestjs/common';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {QuestionSubjectService} from "@/domain/common/question-subject/question-subject.service";
import {ApiQueryListResponse} from "@/common/decorators/swaager-api-response.decorator";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import {ReadQuestionSubjectDto} from "@/domain/common/question-subject/dto/read-question-subject.dto";
import {CreateQuestionSubjectDto} from "@/domain/common/question-subject/dto/create-question-subject.dto";


@ApiTags('question-subject')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
@Controller('question-subject')
export class WebQuestionSubjectController {
    constructor(private readonly service: QuestionSubjectService) {
    }

    @Get(':id')
    @ApiResponse({
        type: ReadQuestionSubjectDto,
    })
    getById(@Param('id') id: number): Promise<ReadQuestionSubjectDto> {
        return this.service.getById(id);
    }

    @Get('/root/parent')
    @ApiResponse({
        type: ReadQuestionSubjectDto,
    })
    getRootParent(): Promise<ReadQuestionSubjectDto> {
        return this.service.getRootParent()
    }


    @Get('/get-childs/:id')
    @ApiQueryListResponse(ReadQuestionSubjectDto)
    getAllChild(@Param('id') id: number): Promise<QueryListResultDto<ReadQuestionSubjectDto>> {
        return this.service.getAllChild(id);
    }


    @Post()
    create(
        @Body() data: CreateQuestionSubjectDto,
    ): Promise<ReadQuestionSubjectDto> {
        return this.service.create(data);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body()
            data: CreateQuestionSubjectDto,
    ): Promise<ReadQuestionSubjectDto> {
        return await this.service.update(id, data);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<QuestionSubject> {
        return this.service.deleteById(id);
    }
}
