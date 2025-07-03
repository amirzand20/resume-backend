import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { BaseInfoRepository } from '@/domain/common/base-info/base-info.repository';

@ValidatorConstraint({ name: 'isValidBaseInfoConstraint', async: true })
@Injectable()
export class IsValidBaseInfoConstraint implements ValidatorConstraintInterface {
  constructor(protected readonly repository: BaseInfoRepository) {}
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'شناسه نوع اطلاعات پایه وارد شده معتبر نمی باشد';
  }
  async validate(
    id: number,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    return this.repository.exist({ where: { id: id } });
  }
}
export function IsValidBaseInfo(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isValidBaseInfo',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidBaseInfoConstraint,
    });
  }
}
