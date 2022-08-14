import TreeItemDto from 'common/dtos/TreeItemDto';
import ModelNotFoundError from 'common/errors/ModelNotFoundError';
import IStore from 'common/interfaces/IStore';
import Tag from 'tags/Tag';
import TreeService from 'common/services/TreeService';
import NewTagDto from 'tags/NewTagDto';

export default class TagService {
    public constructor(private store: IStore<Tag>, private treeService: TreeService) {
        //
    }

    public async get(id: string): Promise<Tag | undefined> {
        return this.store.items.find(tag => tag.id === id);
    }

    public async getTree(): Promise<TreeItemDto<Tag>[] | undefined> {
        return this.treeService.getTree(this.store);
    }


    public async create(tagDto: NewTagDto): Promise<Tag> {
        const tag = new Tag(tagDto.name, tagDto.active, tagDto.parentId);
        this.store.items.push(tag);

        return tag;
    }

    public async update(id: string, tag: Tag): Promise<Tag | undefined> {
        if (!this.store.items.find(t => t.id === id)) {
            return;
        }

        const index = this.store.items.findIndex(t => t.id === id);
        this.store.items[index] = tag;
        this.store.items[index].id = id;

        return this.store.items[index];
    }

    public async delete(id: string): Promise<void> {
        const tag = this.store.items.find(t => t.id === id);

        if (!tag) {
            throw new ModelNotFoundError();
        }

        const children = this.store.items.filter(t => t.parentId === id);

        for (const child of children) {
            await this.delete(child.id)
        }

        this.store.items = this.store.items.filter(t => t.id !== id);
    }
}
