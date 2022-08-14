import {IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';

export default class NewCategoryDto {
    @IsString()
    @IsNotEmpty()
    public title: string = '';

    @IsString()
    @IsNotEmpty()
    public description: string = '';

    @IsOptional()
    @IsUUID()
    public parentId?: string;
}
