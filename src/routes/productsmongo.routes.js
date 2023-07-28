import { Router } from 'express'

import {
    getController,
    getByIdController,
    createController,
    updateController,
    deleteController,
} from '../controllers/products.controllers.js';

import { isAdmin } from '../middleweare/autorization.js';

import { checkAuth } from '../jwt/auth.js';

const router = Router();

router.get('/', getController);
router.get('/:id', getByIdController);
router.post('/', checkAuth, isAdmin, createController);
router.put('/:id', checkAuth, isAdmin , updateController);
router.delete('/:id',checkAuth, isAdmin, deleteController);

export default router;
