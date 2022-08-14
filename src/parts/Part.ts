import {IsOptional, IsString, IsUUID} from 'class-validator';
import {IClonable} from 'common/interfaces/IClonable';
import {INestable} from 'common/interfaces/INestable';
import {v4 as uuidv4} from 'uuid';

export default class Part implements INestable, IClonable<Part> {
    @IsUUID()
    public id: string;

    @IsString()
    public name: string;

    @IsString()
    public code: string;

    @IsOptional()
    @IsString()
    public description?: string;

    @IsOptional()
    @IsUUID()
    public parentId?: string;

    public constructor(name: string, code: string, description?: string, parentId?: string, id?: string) {
        this.id = id ?? uuidv4();
        this.name = name;
        this.code = code;
        this.description = description;
        this.parentId = parentId;
    }

    public clone(): Part {
        return new Part(this.name, this.code, this.description, this.parentId, this.id);
    }
}
