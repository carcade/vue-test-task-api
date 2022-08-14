import IStore from 'common/interfaces/IStore';
import Category from 'categories/Category';

// 2c87b8cf-b93e-43b0-9b37-be72847d9826
// 613d5c97-b1f8-4d93-b405-71311739d3e8
// d08defca-ede2-46ea-8504-139557c0247d
// 1cf86040-b811-409f-b730-94bd412314e9
// 29010a83-3a91-4dbb-bb16-9a6ce9a0a70d
// 4d292be5-7095-4e71-ba8c-cfc4d09d9944
// 8f19a1b0-7762-45bc-a3a9-474270840e23
// 26b9f714-510e-4491-bd10-762784363c52
// b89614de-f5bd-4115-b117-7643a4ea8fe8
// 528b1c4e-686f-4ca9-a3a9-7974023775c8
// 43a379b5-f559-49ef-8995-fccc01fffeea
// 13a69f7d-9edb-4339-950b-e2bfc001ca64
// ccd37c3d-6cc8-45e2-a7a9-98a058322ff5
// c0b63cd1-0764-45c5-bc75-5d3c3b235171
// b2b46ac5-4bef-4dc2-a71c-e8d1d7414dd8
// 584d8667-afbe-4833-b626-273769a767dc
// 0e1b4451-2e50-459d-865c-9d06a4451e5e

const categoriesStore: IStore<Category> = {
    items: [
        new Category('Все категории', 'Самая главная категория', undefined, '13861f3d-c658-4185-bd30-45a59c9e2e9d'),
        new Category('Бытовая техника', 'Техника для дома', '13861f3d-c658-4185-bd30-45a59c9e2e9d', 'f10cd3be-700e-42b2-88fb-004e0922c688'),
        new Category('Техника для кухни', 'Описание техники для кухни', 'f10cd3be-700e-42b2-88fb-004e0922c688', 'ac743569-2d15-4290-993c-6da254f2c029'),
    ],
};

export default categoriesStore;
