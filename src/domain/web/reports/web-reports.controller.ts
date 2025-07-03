import {
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    Req,
    Res,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags,} from '@nestjs/swagger';
import {Request, Response} from 'express';

import {JwtAuthGuard} from '@/auth/guards/jwt-guard.guard';
import {FileUploadErrorTypeEnum} from '@/common/enums/file-upload-error-type.enum';
import {RequestNotPossibleException} from '@/common/utils/exception';
import {ReportsService} from '@/domain/common/reports/reports.service';
import {FileManagerService} from '@/domain/common/file-manager/file-manager.service';
import {FilesInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';

@ApiTags('reports')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('web-auth')
@Controller('reports')
export class WebReportsController {
    constructor(
        private readonly service: ReportsService,
        private fileManagerService: FileManagerService,
    ) {
    }

    @Post('upload-report-document')
    @ApiOperation({summary: 'upload a file'})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'File upload',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                files: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FilesInterceptor('files', 1, {
            storage: diskStorage({
                filename: (req, file, cb) => {
                    cb(null, file.originalname);
                },
            }),
            fileFilter: (req, file, cb) => {
                const fileSize = +(
                    req.headers['Content-Length'] ??
                    req.headers['content-length'] ??
                    0
                );
                if (!file.originalname.match(/\.(mrt|json)$/)) {
                    req.body.fileUploadErrorType =
                        FileUploadErrorTypeEnum.EXTENSION_NOT_ALLOWED;
                    return cb(null, false);

                    //اگر بیشتر از 1 مگ بود جلوش رو بگیره و اکسپشن و خطای 400 بده. البته nginx هم بیشتر از 1 مگ رو جلوش رو میگیره که در اون صورت ارور 413 میده.
                } else if (fileSize > 1024 * 1024) {
                    req.body.fileUploadErrorType = FileUploadErrorTypeEnum.TOO_LARGE;
                    return cb(null, false);
                } else {
                    cb(null, true);
                }
            },
        }),
    )
    async uploadReportDocument(
        @Res() res: Response,
        @UploadedFiles() files,
        @Req() req,
    ): Promise<any> {
        if (Object.hasOwnProperty.bind(req.body)('fileUploadErrorType')) {
            switch (req.body.fileUploadErrorType) {
                case FileUploadErrorTypeEnum.EXTENSION_NOT_ALLOWED:
                    throw new RequestNotPossibleException(
                        'فرمت این فایل پشتیبانی نمی شود',
                    );
                case FileUploadErrorTypeEnum.TOO_LARGE:
                    return res.status(HttpStatus.PAYLOAD_TOO_LARGE).json({
                        statusCode: HttpStatus.PAYLOAD_TOO_LARGE,
                        message: 'حجم فایل از حد مجاز بیشتر است',
                    });
                default:
                    break;
            }
        } else {
        }
        return await this.service.create(files, res);
    }

    @Get('download-report-document/:id')
    async downloadFile(@Param('id') id: number, @Res() res: Response) {
        try {
            const streamId = await this.service.getStreamIdById(id);
            const result = await this.fileManagerService.getFile(streamId);
            const buffer = new Buffer(result.data.data.FileStreamContent.data);

            res.header(
                'Content-Disposition',
                'attachment; filename=' + encodeURI(result.data.data.FileName),
            );
            res.header('Content-Type', '*/*');
            return res.send(buffer);
        } catch (e) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Download Failed ' + e.toString(),
                data: null,
            });
        }
    }

    @Get('get-mrt/:mrtName')
    async getMrtFile(
        @Req() req: Request,
        @Res() res: Response,
        @Param('mrtName') mrtName: string,
    ): Promise<any> {
        const ip =
            req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
        const mrtFile = await this.service.getMrtFile(mrtName);

        return res.json({
            ip,
            mrtFile,
        });
    }
}
