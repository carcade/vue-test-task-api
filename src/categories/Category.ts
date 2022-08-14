import {IsOptional, IsString, IsUUID} from 'class-validator';
import {IClonable} from 'common/interfaces/IClonable';
import {INestable} from 'common/interfaces/INestable';
import {v4 as uuidv4} from 'uuid';

export default class Category implements INestable, IClonable<Category> {
    @IsUUID()
    public id: string;

    @IsString()
    public title: string;

    @IsString()
    public description: string;

    @IsOptional()
    @IsUUID()
    public parentId?: string;

    public constructor(title: string, description: string, parentId?: string, id?: string) {
        this.id = id ?? uuidv4();
        this.title = title;
        this.description = description;
        this.parentId = parentId;
    }

    public clone(): Category {
        return new Category(this.title, this.description, this.parentId, this.id);
    }
}
