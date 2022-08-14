import {plainToInstance} from 'class-transformer';
import {validate} from 'class-validator';
import express, {Express, Request, Response} from 'express';
import NewPartDto from 'parts/NewPartDto';
import Part from 'parts/Part';
import PartService from 'parts/PartService';

export default class PartController {
    public constructor(app: Express, private partService: PartService) {
        const router = express.Router();

        router.get('/', this.index.bind(this));
        router.post('/', this.createOne.bind(this));
        router.get('/:id', this.findOne.bind(this));
        router.put('/:id', this.updateOne.bind(this));
        router.delete('/:id', this.deleteOne.bind(this));

        app.use('/parts', router);
    }

    public async index(req: Request, res: Response) {
        const tagsTree = await this.partService.getTree();

        if (!tagsTree) {
            res.status(404).end();
            return;
        }

        res.json(tagsTree);
    }

    public async findOne(req: Request, res: Response) {
        const id = req.params.id;
        const part = await this.partService.get(id);

        if (!part) {
            res.status(404).end();
            return;
        }

        res.json(part);
    }

    public async createOne(req: Request, res: Response) {
        const partDto = plainToInstance(NewPartDto, req.body);
        const errors = await validate(partDto);

        if (errors.length > 0) {
            throw errors[0];
        }

        const part = await this.partService.create(partDto);
        res.json(part);
    }

    public async updateOne(req: Request, res: Response) {
        const id = req.params.id;
        const part = plainToInstance(Part, req.body as unknown);
        const errors = await validate(part);

        if (errors.length > 0) {
            throw errors[0];
        }

        const updatedPart = await this.partService.update(id, part);
        res.json(updatedPart);
    }

    public async deleteOne(req: Request, res: Response) {
        const id = req.params.id;
        await this.partService.delete(id);
        res.status(201).end();
    }
}
