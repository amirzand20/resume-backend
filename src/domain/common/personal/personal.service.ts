import {Injectable} from "@nestjs/common";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Personal} from "@/entities/personal.entity";
import {Mapper} from "@automapper/core";
import {InjectMapper} from "@automapper/nestjs";
import {FileManagerService} from "@/domain/common/file-manager/file-manager.service";
import {
  OperationNotSuccessfulException,
  RequestedInfoNotFoundException,
  RequestNotPossibleException
} from "@/common/utils/exception";
import {SortParam} from "@/common/dto/request-params/sort-param";
import {QueryListResultDto} from "@/common/dto/result/query-list-result.dto";
import { ExamQuestionRepository } from "../exam-question/exam-question.repository";
import { OrganRepository } from "../organ/organ.repository";
import { CreatePersonalDto } from "./dto/create-personal.dto";
import { ReadPersonalDto } from "./dto/read-personal.dto";
import { PersonalRepository } from "./personal.repository";

@Injectable()
export class PersonalService extends TypeOrmCrudService<Personal> {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private readonly repository: PersonalRepository,
    protected readonly fileManagerService: FileManagerService,
    private readonly examQuestionRepository: ExamQuestionRepository,
    private readonly organRepository: OrganRepository,
  ) {
    super(repository);
  }

  async deleteById(id: number): Promise<Personal> {
    const criteria = { id: id };
    const Personal = await this.repository.findOne({ where: criteria });
    if (!Personal) throw new RequestedInfoNotFoundException();
    const examPersonal = await this.examQuestionRepository.findBy({
      // PersonalId: Personal.id,
    });
    if (examPersonal.length > 0) {
      throw new RequestNotPossibleException('این سوال در آزمونی اضافه شده است');
    } else {
      return await this.repository.remove(Personal);
    }
  }

  async create(data: CreatePersonalDto): Promise<ReadPersonalDto> {
    const instance = this.mapper.map(data, CreatePersonalDto, Personal);
    const saveResult = await this.repository.save(instance);
    if (saveResult.id > 0)
      return this.mapper.map(saveResult, Personal, ReadPersonalDto);
    else throw new OperationNotSuccessfulException();
  }

  async update(id: number, data: any): Promise<ReadPersonalDto> {
    const personal = await this.repository.findOne({
      where: { id: id },
    });
    if (!personal) throw new RequestedInfoNotFoundException();

    personal.nationalNo = data.nationalNo;
    personal.personalNo = data.personalNo;
    personal.firstName = data.firstName;
    personal.lastName = data.lastName;
    personal.fatherName = data.fatherName;
    personal.organId = data.organId;

    return this.mapper.map(
      await this.repository.save(personal),
      Personal,
      ReadPersonalDto,
    );
  }

  async getById(id: number): Promise<any> {
    const result = await this.repository.findById(id);
    if (!result) throw new RequestedInfoNotFoundException();
    return result;
  }

  async getAllWithFilter(
    filterParam: any,
    sortParam: SortParam,
    page: number,
    pageLimit: number,
  ): Promise<QueryListResultDto<ReadPersonalDto>> {
    let finalOrganId: number = null;
    let finalLeftId: number = null;
    let finalRightId: number = null;

    const organ = await this.organRepository.findById(filterParam.organId);

    if (organ != null) {
        finalOrganId = organ.id;
        finalLeftId = organ.leftId;
        finalRightId = organ.rightId;
    }
    const [data, count] = await this.repository.getAllWithFilter(
      filterParam,
      sortParam,
      page,
      pageLimit,
      finalOrganId,
      finalLeftId,
      finalRightId
    );

    return {
      total: count,
      data: this.mapper.mapArray(data, Personal, ReadPersonalDto),
    };
  }

}
