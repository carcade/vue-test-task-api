export default interface TreeItemDto<T> {
    record: T;
    children: TreeItemDto<T>[];
}
