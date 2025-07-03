import { ApiProperty } from "@nestjsx/crud/lib/crud";

export class LoginDto {
    @ApiProperty()
    username: string;
    @ApiProperty()
    password: string;
}