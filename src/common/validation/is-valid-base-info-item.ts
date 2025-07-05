import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from '@nestjs/common';
// import {BaseInfoItem} from "@/entities/base-info-item.entity";
// import { BaseInfoItemRepository } from '@/domain/common/base-info-item/base-info-item.repository';

@ValidatorConstraint({name: 'isValidBaseInfoItemConstraint', async: true})
@Injectable()
export class IsValidBaseInfoItemConstraint
    implements ValidatorConstraintInterface {
    constructor(/* protected readonly repository: BaseInfoItemRepository */) {
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'شناسه آیتم اطلاعات پایه وارد شده معتبر نمی باشد';
    }

    async validate(
        id: number,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        // return await this.repository.exist({where: {id: id}})
        return true; // Temporary fix
    }

    async validateWithParent(
        id: number,
        parentId: number,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {
        // const baseInfoItem: BaseInfoItem = await this.repository.findOne({where: {id: id}});
        // return baseInfoItem && baseInfoItem.baseInfoId === parentId;
        return true; // Temporary fix
    }
}

export function IsValidBaseInfoItem(validationOptions?: ValidationOptions) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'isValidBaseInfoItem',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidBaseInfoItemConstraint,
        });
    };
}
