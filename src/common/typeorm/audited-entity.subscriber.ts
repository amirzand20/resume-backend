import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { Injectable } from "@nestjs/common";
import { RequestContext } from "@/common/utils/request-context";
// import { AuditedEntity } from "@/entities/common/audited.entity";

// Temporary interface
interface AuditedEntity {
    createdBy?: number;
    createdDate?: Date;
    modifiedBy?: number;
    modifiedDate?: Date;
}

@EventSubscriber()
@Injectable()
export class AuditedEntitySubscriber implements EntitySubscriberInterface<AuditedEntity> {
    listenTo(): any {
        return "AuditedEntity";
    }
    beforeInsert(event: InsertEvent<AuditedEntity>): Promise<any> | void {
        let currentUser = RequestContext.currentRequest()
        event.entity.createdBy = 1;
        event.entity.createdDate = new Date();
    }
    beforeUpdate(event: UpdateEvent<AuditedEntity>): Promise<any> | void {
        let currentUser = RequestContext.currentUser()
        event.entity.modifiedBy = 1;
        event.entity.modifiedDate = new Date();
    }

}