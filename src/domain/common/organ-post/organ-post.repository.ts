import {InjectRepository} from '@nestjs/typeorm';
import {assert} from 'console';
import * as sql from 'mssql';
import {OrganPost} from '@/entities/organ-post.entity';
import {Repository} from 'typeorm';
import '@/common/typeorm/select-query-builder-extentions';

export class OrganPostRepository extends Repository<OrganPost> {
    constructor(
        @InjectRepository(OrganPost)
        private readonly repository: Repository<OrganPost>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getPostByOrganId(organId: number) {
        assert(typeof organId === 'number' && !Number.isNaN(organId));
        const response = await (this.manager.connection.driver as any).master
            .request()
            .input('OrganId', sql.Int, organId)
            .execute('organ.usp_GetVirtualOrganPost');

        return response.recordset.map((x) => x);
    }

}

