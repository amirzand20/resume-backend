import {Controller, Get, HttpStatus, Res, UseGuards,} from '@nestjs/common';
import {Response} from 'express';
import {ApiBearerAuth, ApiQuery, ApiTags} from '@nestjs/swagger';
import {EmploymentService} from './employment.service';
import {Filter} from '@/common/decorators/filter.decorator';
import {PageLimit} from '@/common/decorators/limit.decorator';
import {Pagination} from '@/common/decorators/pagination.decorator';
import {Sort} from '@/common/decorators/sort.decorator';
import {SortParam} from '@/common/dto/request-params/sort-param';
import {OAuthJwtGuard} from "@/auth/guards/oauth-jwt-guard.guard";

@Controller('admin/employment')
@ApiTags('employment')
@UseGuards(OAuthJwtGuard)
@ApiBearerAuth('sso-auth')
export class EmploymentController {
    constructor(private service: EmploymentService) {
    }


    @Get('/get-volunteer/type')
    // @ApiQueryListResponse(ReadDossierDto)
    @ApiQuery({name: "forceId"})
    @ApiQuery({name: "processTypeId"})
    @ApiQuery({name: "firstName", required: false})
    @ApiQuery({name: "lastName", required: false})
    @ApiQuery({name: "nationalNo", required: false})
    async getVolunteerType(
        @Res() res: Response,
        @Pagination() page,
        @PageLimit() pageLimit,
        @Filter() filter,
        @Sort() sort: SortParam,
    ): Promise<any> {

        const result = await this.service.getVolunteerType(filter, sort, page, pageLimit);
        if (result) res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Volunteer Finder Advanced',
            data: result.data,
        });
        else res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Volunteer Finder Advanced',
        });
    }

    @Get('/get-all/process-type')
    async getAllProcessType(@Res() res: Response) {
        const result: any = await this.service.getAllProcessType();
        return res.status(HttpStatus.OK).json(result.data);
    }


}