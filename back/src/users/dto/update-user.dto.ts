import { IsString, IsNumber, IsOptional } from "class-validator";
export class UpdateUserDto {
    @IsString()
    @IsOptional()
    readonly username? : string;

    @IsString()
    @IsOptional()
    readonly email? : string;

    @IsString()
    @IsOptional()
    readonly password? : string

    @IsString()
    @IsOptional()
    readonly urlImg? : string
}