import 'reflect-metadata';
import CategoryController from 'categories/CategoryController';
import categoriesStore from 'categories/categoriesStore';
import ModelNotFoundError from 'common/errors/ModelNotFoundError';
import express, {ErrorRequestHandler} from 'express';
import 'express-async-errors';
import CategoryService from 'categories/CategoryService';
import TreeService from 'common/services/TreeService';
import cors from 'cors';
import {ValidationError} from 'class-validator';
import PartController from 'parts/PartController';
import PartService from 'parts/PartService';
import partsStore from 'parts/partsStore';
import TagController from 'tags/TagController';
import TagService from 'tags/TagService';
import tagsStore from 'tags/tagsStore';

const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost:3000';
const port = 8080;
const app = express();

const treeService = new TreeService();
const categoryService = new CategoryService(categoriesStore, treeService);
const tagService = new TagService(tagsStore, treeService);
const partService = new PartService(partsStore, treeService);

app.use(express.json());
app.use(cors({origin: corsOrigin}));

const categoryController = new CategoryController(app, categoryService);
const tagController = new TagController(app, tagService);
const partController = new PartController(app, partService);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    let status = 500;
    let message = err.message ?? 'unknown error';

    if (err instanceof ModelNotFoundError) {
        status = 404;
    } else if (err instanceof ValidationError) {
        status = 400;

        if (err.constraints) {
            message = Object.values(err.constraints).join(', ');
        }
    } else {
        console.error(err.stack);
    }

    res.status(status).json({message: message});
};

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
