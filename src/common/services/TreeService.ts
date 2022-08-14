import TreeItemDto from 'common/dtos/TreeItemDto';
import {IClonable} from 'common/interfaces/IClonable';
import {INestable} from 'common/interfaces/INestable';
import IStore from 'common/interfaces/IStore';

export default class TreeService {
    public async getTree<T extends INestable & IClonable<T>>(store: IStore<T>): Promise<TreeItemDto<T>[] | undefined> {
        function getItemChildrenRecursive(items: T[]): TreeItemDto<T>[] {
            const treeItems = items.map<TreeItemDto<T>>(item => ({
                record: item.clone(),
                children: [],
            }));
            
            for (const treeItem of treeItems) {
                const childItems = store.items.filter(it => it.parentId === treeItem.record.id);
                treeItem.children = getItemChildrenRecursive(childItems);
            }
            
            return treeItems;
        }

        const rootModels = store.items.filter(item => !item.parentId);

        if (rootModels.length === 0) {
            return;
        }

        return getItemChildrenRecursive(rootModels);
    }
}
