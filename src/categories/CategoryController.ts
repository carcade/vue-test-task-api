import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import NewCategoryDto from 'categories/NewCategoryDto';
import express, {Express, Request, Response} from 'express';
import Category from 'categories/Category';
import CategoryService from 'categories/CategoryService';

export default class CategoryController {
    public constructor(app: Express, private categoryService: CategoryService) {
        const router = express.Router();

        router.get('/', this.index.bind(this));
        router.post('/', this.createOne.bind(this));
        router.get('/:id', this.findOne.bind(this));
        router.put('/:id', this.updateOne.bind(this));
        router.delete('/:id', this.deleteOne.bind(this));

        app.use('/categories', router);
    }

    public async index(req: Request, res: Response) {
        const tagsTree = await this.categoryService.getTree();

        if (!tagsTree) {
            res.status(404).end();
            return;
        }

        res.json(tagsTree);
    }

    public async findOne(req: Request, res: Response) {
        const id = req.params.id;
        const category = await this.categoryService.get(id);

        if (!category) {
            res.status(404).end();
            return;
        }

        res.json(category);
    }

    public async createOne(req: Request, res: Response) {
        const categoryDto = plainToInstance(NewCategoryDto, req.body);
        const errors = await validate(categoryDto);

        if (errors.length > 0) {
            throw errors[0];
        }

        const category = await this.categoryService.create(categoryDto);
        res.json(category);
    }

    public async updateOne(req: Request, res: Response) {
        const id = req.params.id;
        const category = plainToInstance(Category, req.body as unknown);
        const errors = await validate(category);

        if (errors.length > 0) {
            throw errors[0];
        }

        const updatedCategory = await this.categoryService.update(id, category);
        res.json(updatedCategory);
    }

    public async deleteOne(req: Request, res: Response) {
        const id = req.params.id;
        await this.categoryService.delete(id);
        res.status(201).end();
    }
}
