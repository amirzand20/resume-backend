import {
    registerDecorator,
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {Injectable} from '@nestjs/common';
import {BaseInfoItem} from "@/entities/base-info-item.entity";
import { BaseInfoItemRepository } from '@/domain/common/base-info-item/base-info-item.repository';

@ValidatorConstraint({name: 'isValidBaseInfoItemConstraint', async: true})
@Injectable()
export class IsValidBaseInfoItemConstraint
    implements ValidatorConstraintInterface {
    constructor(protected readonly repository: BaseInfoItemRepository) {
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return 'شناسه اطلاعات پایه وارد شده معتبر نمی باشد';
    }

    async validate(
        id: number,
        validationArguments?: ValidationArguments,
    ): Promise<boolean> {

        if (validationArguments.constraints[0] === undefined) {
            return await this.repository.exist({where: {id: id}})
        } else {
            const baseInfoId: number = validationArguments.constraints[0];
            const baseInfoItem: BaseInfoItem = await this.repository.findOne({where: {id: id}});
            if (baseInfoItem === null) {
                return false;
            }
            return baseInfoItem.baseInfoId === baseInfoId;
        }

    }
}

export function IsValidBaseInfoItem(validationOptions?: ValidationOptions, baseInfoId?: number) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'isValidBaseInfoItem',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [baseInfoId],
            validator: IsValidBaseInfoItemConstraint,
        });
    };
}
