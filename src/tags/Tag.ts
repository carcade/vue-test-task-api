import {IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID} from 'class-validator';
import {IClonable} from 'common/interfaces/IClonable';
import {INestable} from 'common/interfaces/INestable';
import {v4 as uuidv4} from 'uuid';

export default class Tag implements INestable, IClonable<Tag> {
    @IsUUID()
    public id: string;

    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsBoolean()
    @IsNotEmpty()
    public active: boolean;

    @IsOptional()
    @IsUUID()
    public parentId?: string;

    public constructor(name: string, active: boolean, parentId?: string, id?: string) {
        this.id = id ?? uuidv4();
        this.name = name;
        this.active = active;
        this.parentId = parentId;
    }

    public clone(): Tag {
        return new Tag(this.name, this.active, this.parentId, this.id);
    }
}
