import { Router } from 'express'

import {
    getController,
    getByIdController,
    createController,
    updateController,
    deleteController,
} from '../controllers/products.controllers.js';

import { isAdmin } from '../middleweare/autorization.js';

const router = Router();

router.get('/', getController);
router.get('/:id', getByIdController);
router.post('/', isAdmin, createController);
router.put('/:id', isAdmin , updateController);
router.delete('/:id',isAdmin, deleteController);

export default router;
