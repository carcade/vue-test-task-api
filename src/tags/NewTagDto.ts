import {IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

export default class NewTagDto {
    @IsString()
    @IsNotEmpty()
    public name!: string;

    @IsBoolean()
    @IsNotEmpty()
    public active!: boolean;

    @IsOptional()
    @IsUUID()
    public parentId?: string;
}
