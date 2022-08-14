import TreeItemDto from 'common/dtos/TreeItemDto';
import ModelNotFoundError from 'common/errors/ModelNotFoundError';
import IStore from 'common/interfaces/IStore';
import Part from 'parts/Part';
import TreeService from 'common/services/TreeService';
import NewPartDto from 'parts/NewPartDto';

export default class PartService {
    public constructor(private store: IStore<Part>, private treeService: TreeService) {
        //
    }

    public async get(id: string): Promise<Part | undefined> {
        return this.store.items.find(tag => tag.id === id);
    }

    public async getTree(): Promise<TreeItemDto<Part>[] | undefined> {
        return this.treeService.getTree(this.store);
    }

    public async create(partDto: NewPartDto): Promise<Part> {
        const newPart = new Part(partDto.name, partDto.code, partDto.description, partDto.parentId);
        this.store.items.push(newPart);

        return newPart;
    }

    public async update(id: string, tag: Part): Promise<Part | undefined> {
        if (!this.store.items.find(t => t.id === id)) {
            return;
        }

        const index = this.store.items.findIndex(t => t.id === id);
        this.store.items[index] = tag;
        this.store.items[index].id = id;

        return this.store.items[index];
    }

    public async delete(id: string): Promise<void> {
        const part = this.store.items.find(p => p.id === id);

        if (!part) {
            throw new ModelNotFoundError();
        }

        const children = this.store.items.filter(p => p.parentId === id);

        for (const child of children) {
            await this.delete(child.id)
        }

        this.store.items = this.store.items.filter(p => p.id !== id);
    }
}
