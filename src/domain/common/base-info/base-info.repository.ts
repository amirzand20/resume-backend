import { BaseInfo } from '@/entities/base-info.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Brackets, ILike, IsNull, Repository} from 'typeorm';

export class BaseInfoRepository extends Repository<BaseInfo> {
    constructor(
        @InjectRepository(BaseInfo)
        private readonly repository: Repository<BaseInfo>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    getAll(
        filterParam,
        sortParam,
        page: number,
        pageLimit: number,
        systemId: number,
    ) {
        const query = this.repository
            .createQueryBuilder('baseInfo')
            .where(
                new Brackets((subQuery) => {
                    subQuery.where({systemId: systemId});
                    subQuery.orWhere({systemId: IsNull()});
                }),
            )
            .andWhere({
                ...(filterParam?.name && {
                    name: ILike(`%${filterParam.name}%`),
                }),
            });

        query.addSort(sortParam).addPagination(pageLimit, page);

        return query.getManyAndCount();
    }
}
