import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import express, {Express, Request, Response} from 'express';
import NewTagDto from 'tags/NewTagDto';
import Tag from 'tags/Tag';
import TagService from 'tags/TagService';

export default class TagController {
    public constructor(app: Express, private tagService: TagService) {
        const router = express.Router();

        router.get('/', this.index.bind(this));
        router.post('/', this.createOne.bind(this));
        router.get('/:id', this.findOne.bind(this));
        router.put('/:id', this.updateOne.bind(this));
        router.delete('/:id', this.deleteOne.bind(this));

        app.use('/tags', router);
    }

    public async index(req: Request, res: Response) {
        const tagsTree = await this.tagService.getTree();

        if (!tagsTree) {
            res.status(404).end();
            return;
        }

        res.json(tagsTree);
    }

    public async findOne(req: Request, res: Response) {
        const id = req.params.id;
        const tag = await this.tagService.get(id);

        if (!tag) {
            res.status(404).end();
            return;
        }

        res.json(tag);
    }

    public async createOne(req: Request, res: Response) {
        const tagDto = plainToInstance(NewTagDto, req.body);
        const errors = await validate(tagDto);

        if (errors.length > 0) {
            throw errors[0];
        }

        const tag = await this.tagService.create(tagDto);
        res.json(tag);
    }

    public async updateOne(req: Request, res: Response) {
        const id = req.params.id;
        const tag = plainToInstance(Tag, req.body as unknown);
        const errors = await validate(tag);

        if (errors.length > 0) {
            throw errors[0];
        }

        const updatedTag = await this.tagService.update(id, tag);
        res.json(updatedTag);
    }

    public async deleteOne(req: Request, res: Response) {
        const id = req.params.id;
        await this.tagService.delete(id);
        res.status(201).end();
    }
}
