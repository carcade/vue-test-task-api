import IStore from 'common/interfaces/IStore';
import Tag from 'tags/Tag';

// 6ef11505-6452-425a-9bf6-5d45c9e5b7d2
// fc524ee9-a40d-4512-9c0a-5b4020e6970a

const tagsStore: IStore<Tag> = {
    items: [
        new Tag('Все теги', true, undefined, 'b89dca16-9e6f-4d9a-92fc-4bb307b4a3e0'),
        new Tag('Популярное', false, 'b89dca16-9e6f-4d9a-92fc-4bb307b4a3e0', '25a13518-ce73-43fc-b470-937df6328fae'),
        new Tag('В тренде', true, '25a13518-ce73-43fc-b470-937df6328fae', 'a47a62ff-0905-495f-af00-093940dc2570'),
        new Tag('Акции', false, '25a13518-ce73-43fc-b470-937df6328fae', '9dadbb6b-22c9-4a94-b201-a86f2ca470e3'),
        new Tag('Подарки', true, 'b89dca16-9e6f-4d9a-92fc-4bb307b4a3e0', 'bc3ab4a0-b064-4e88-b983-4b956ea8b064'),
        new Tag('Подарки мужчинам', true, 'bc3ab4a0-b064-4e88-b983-4b956ea8b064', 'aaaf19a1-6cca-4672-bedd-2a8d5670047c'),
        new Tag('Подарки женщинам', true, 'bc3ab4a0-b064-4e88-b983-4b956ea8b064', 'af3df5c4-8e8d-4590-a4de-c7dea484ec2f'),
        new Tag('Подарки на новый год', true, 'bc3ab4a0-b064-4e88-b983-4b956ea8b064', 'e61d6622-5c18-43ef-929a-b2c495f7f1f2'),
    ],
};

export default tagsStore;
