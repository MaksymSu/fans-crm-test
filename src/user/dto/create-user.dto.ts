import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword, Length } from "class-validator";

export class CreateUserDto {
    @ApiProperty({ example: 'Connor256', description: 'Name' })
    @IsString()
    @Length(2, 30)
    readonly name: string;

    @ApiProperty({ example: '123@gmail.com', description: 'Email' })
    @IsEmail()
    readonly email: string;

    @ApiProperty({ example: '21313dfdfDD$', description: 'Password' })
    @IsStrongPassword()
    readonly password: string;
}
