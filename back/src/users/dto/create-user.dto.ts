import { IsString, IsNumber, IsOptional } from "class-validator";
export class CreateUserDto {
    @IsString()
    readonly username : string;
    @IsString()
    readonly email : string;
    @IsString()
    readonly password : string
    @IsString()
    readonly urlImg : string
}
