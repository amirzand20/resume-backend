import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import * as sql from "mssql";
import "@/common/typeorm/select-query-builder-extentions";
import {OrganOperational} from "@/entities/organ-operational.entity";
import {assert} from "console";

export class OrganOperationalRepository extends Repository<OrganOperational> {
    constructor(
        @InjectRepository(OrganOperational)
        private readonly repository: Repository<OrganOperational>,
    ) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async getOperationalByOrganId(organId: number) {
        assert(typeof organId === 'number' && !Number.isNaN(organId));
        const response = await (this.manager.connection.driver as any).master
            .request()
            .input('OrganId', sql.Int, organId)
            .execute('organ.usp_GetVirtualOrganOperational');

        return response.recordset.map((x) => x);
    }
}
