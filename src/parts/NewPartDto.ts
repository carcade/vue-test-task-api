import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

export default class NewPartDto {
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsString()
    @IsNotEmpty()
    public code!: string;

    @IsOptional()
    @IsString()
    public description?: string;

    @IsOptional()
    @IsUUID()
    public parentId?: string;
}
