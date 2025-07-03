import { HttpClientService } from '@/http-client/http-client.service';
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class EmploymentService {
  constructor(
    protected httpService: HttpClientService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  async getVolunteerType(filter, sort, page, pageLimit) {
    return this.httpService.get(
      `${process.env.EMPLOYMENT_BACKEND_URL}/dossier/get-volunteer/type?forceId=${filter.forceId}&processTypeId=${filter.processTypeId}&firstName=${encodeURI(filter.firstName)}&lastName=${encodeURI(filter.lastName)}&nationalNo=${filter.nationalNo}&page=${page}&pageLimit=${pageLimit}`,
      {
        headers: {
          Authorization: this.request.headers.authorization,
        },
      },
    );
  }

  async getAllProcessType() {
    return this.httpService.get(
      process.env.EMPLOYMENT_BACKEND_URL + '/process-type/get-all/process-type',
    );
  }
}
