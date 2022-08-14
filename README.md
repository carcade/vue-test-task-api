# Vue test task API

## Описание

API сервер предоставляющий CRUD операции для сущностей: "категории", "детали", "теги".

Данные хранятся в оперативной памяти и при перезапуске сервера будут сброшены.

## Настройка и запуск

1. В корне проекта создать файл `docker-compose.override.yml`, скопировать в него содержимое из файла `docker-compose.override.sample.yml`.
2. В поле `CORS_ORIGIN` указать адрес веб-приложения, с которого будет происходить обращение к серверу.
3. Из корня проекта выполнить команду `docker-compose up -d`
4. API сервер будет доступен по адресу `http://localhost:8080`

## API

### Модели

Поля, у которых в названии присутствует знак вопроса, являются опциональными (пример: `parentId?: string;`).

#### Category
```ts
{
    id: string;
    title: string;
    description: string;
    parentId?: string;
}
```

#### NewCategory
```ts
{
    title: string;
    description: string;
    parentId?: string;
}
```

#### UpdateCategory
```ts
{
    title: string;
    description: string;
    parentId?: string;
}
```

#### CategoryTreeItem
```ts
{
    record: Category;
    children: CategoryTreeItem[];
}
```

#### Part
```ts
{
    id: string;
    name: string;
    code: string;
    description?: string;
    parentId?: string;
}
```

#### NewPart
```ts
{
    name: string;
    code: string;
    description?: string;
    parentId?: string;
}
```

#### UpdatePart
```ts
{
    name: string;
    code: string;
    description?: string;
    parentId?: string;
}
```

#### PartTreeItem
```ts
{
    record: Part;
    children: PartTreeItem[];
}
```

#### Tag
```ts
{
    id: string;
    name: string;
    active: boolean;
    parentId?: string;
}
```

#### NewTag
```ts
{
    name: string;
    active: boolean;
    parentId?: string;
}
```

#### UpdateTag
```ts
{
    name: string;
    active: boolean;
    parentId?: string;
}
```

#### TagTreeItem
```ts
{
    record: Tag;
    children: TagTreeItem[];
}
```

#### Error
```ts
{
    message: string;
}
```

### Сервисы

#### GET /categories
Возвращает массив [CategoryTreeItem](#categorytreeitem)

#### POST /categories
Создает новую категорию. 

На вход принимает объект [NewCategory](#newcategory).

Возвращает объект [Category](#category).

#### PUT /categories/{id}
Обновляет существующую категорию. 

На вход принимает объект [UpdateCategory](#updatecategory).

Возвращает объект [Category](#category).

**URL параметры:**

`{id}` - идентификатор обновляемой категории

#### DELETE /categories/{id}
Удаляет категорию

**URL параметры:**

`{id}` - идентификатор удаляемой категории

#### GET /parts
Возвращает массив [PartTreeItem](#parttreeitem)

#### POST /parts
Создает новую деталь. 

На вход принимает объект [NewPart](#newpart).

Возвращает объект [Part](#part).

#### PUT /parts/{id}
Обновляет существующую деталь. 

На вход принимает объект [UpdatePart](#updatepart).

Возвращает объект [Part](#part).

**URL параметры:**

`{id}` - идентификатор обновляемой детали

#### DELETE /parts/{id}
Удаляет деталь

**URL параметры:**

`{id}` - идентификатор удаляемой деталь

#### GET /tags
Возвращает массив [TagTreeItem](#tagtreeitem)

#### POST /tags
Создает новый тег.

На вход принимает объект [NewTag](#newtag).

Возвращает объект [Tag](#tag).

#### PUT /tags/{id}
Обновляет существующий тег.

На вход принимает объект [UpdateTag](#updatetag).

Возвращает объект [Tag](#tag).

**URL параметры:**

`{id}` - идентификатор обновляемого тега

#### DELETE /tags/{id}
Удаляет тег

**URL параметры:**

`{id}` - идентификатор удаляемого тега

### Ошибки

HTTP статусы ответов:
- `200` - успешный запрос GET/POST/PUT
- `201` - успешный запрос DELETE
- `400` - ошибка запроса POST/PUT (неверные входные данные)
- `404` - ошибка запроса GET/PUT/DELETE (модель не найдена)
- `500` - внутренняя ошибка сервера

При возникновении ошибок (статусы `400`/`404`/`500`), в ответ на запрос будет возвращен объект [Error](#error).
