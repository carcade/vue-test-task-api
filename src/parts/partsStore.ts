import IStore from 'common/interfaces/IStore';
import Part from 'parts/Part';

const partsStore: IStore<Part> = {
    items: [
        new Part('Ноутбук', 'sku0231', undefined, undefined, '7d72ec37-22c8-41b6-93dc-5f93095590c3'),
        new Part('Корпус', 'sku0232', undefined, '7d72ec37-22c8-41b6-93dc-5f93095590c3', 'e2b0fd41-94f1-4e81-8b55-48a71b54a8d7'),
        new Part('Материнская плата', 'sku0233', 'Обычная материнская плата', '7d72ec37-22c8-41b6-93dc-5f93095590c3', '074ecea4-3cfd-441f-9720-b1d572727fe4'),
        new Part('Процессор', 'sku0234', undefined, '074ecea4-3cfd-441f-9720-b1d572727fe4', 'e77d0025-8753-4c98-8e85-3ea847da76d2'),
        new Part('Оперативная память', 'sku0235', undefined, '074ecea4-3cfd-441f-9720-b1d572727fe4', 'bfe6767f-95d5-4d21-adf5-464af07ba3d5'),
        new Part('Дисплей', 'sku0236', 'Обычный дисплей', '7d72ec37-22c8-41b6-93dc-5f93095590c3', 'f0460434-e311-4b17-b80b-8ea241f89c53'),
        new Part('Динамик', 'sku0237', undefined, '7d72ec37-22c8-41b6-93dc-5f93095590c3', '95d5b19e-6d43-4a3b-89de-baa83c5ed1d8'),
        new Part('Клавиатура', 'sku0238', undefined, '7d72ec37-22c8-41b6-93dc-5f93095590c3', 'a095f379-4806-4cb7-a617-873981bf60ee'),
    ],
};

export default partsStore;
