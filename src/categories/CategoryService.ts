import NewCategoryDto from 'categories/NewCategoryDto';
import TreeItemDto from 'common/dtos/TreeItemDto';
import ModelNotFoundError from 'common/errors/ModelNotFoundError';
import IStore from 'common/interfaces/IStore';
import Category from 'categories/Category';
import TreeService from 'common/services/TreeService';

export default class CategoryService {
    public constructor(private store: IStore<Category>, private treeService: TreeService) {
        //
    }

    public async get(id: string): Promise<Category> {
        const category = this.store.items.find(category => category.id === id);

        if (!category) {
            throw new ModelNotFoundError();
        }

        return category;
    }

    public async getTree(): Promise<TreeItemDto<Category>[] | undefined> {
        return await this.treeService.getTree(this.store) ?? [];
    }

    public async create(category: NewCategoryDto): Promise<Category> {
        const newCategory = new Category(category.title, category.description, category.parentId);
        this.store.items.push(newCategory);

        return newCategory;
    }

    public async update(id: string, updatedCategory: Category): Promise<Category | undefined> {
        if (!this.store.items.find(cat => cat.id === id)) {
            throw new ModelNotFoundError();
        }

        const index = this.store.items.findIndex(cat => cat.id === id);
        this.store.items[index] = updatedCategory;
        this.store.items[index].id = id;

        return this.store.items[index];
    }

    public async delete(id: string): Promise<void> {
        const category = this.store.items.find(category => category.id === id);

        if (!category) {
            throw new ModelNotFoundError();
        }

        const children = this.store.items.filter(cat => cat.parentId === id);

        for (const child of children) {
            await this.delete(child.id)
        }

        this.store.items = this.store.items.filter(category => category.id !== id);
    }
}
