import { BaseTableEnum } from "@/common/enums/base-table.enum";
import { IsValidBaseInfoItem } from "@/common/validation/is-valid-base-info-item";
import { AutoMap } from "@automapper/classes"
import { ApiProperty } from "@nestjs/swagger"

export class CreateReportDocumentDto {
      @AutoMap()
      @ApiProperty()
      systemId: number;

      @AutoMap()
      @ApiProperty()
      @IsValidBaseInfoItem({message: 'مقدار وارد شده در فیلد استنادیه قانونی نامعتبر است'}, BaseTableEnum.Document)
      documentId: string;

      @AutoMap()
      @ApiProperty()
      documentName: string;

      @AutoMap()
      @ApiProperty()
      documentTitle: string;

}
