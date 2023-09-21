import { Router } from 'express'

import {
    getController,
    getByIdController,
    createController,
    updateController,
    deleteController,
} from '../controllers/products.controllers.js';

import { isAdmin , isPremiumOrAdmin } from '../middleweare/autorization.js';

import { checkAuth } from '../jwt/auth.js';

const router = Router();

router.get('/', getController);
router.get('/:id', getByIdController);
router.post('/', checkAuth, isPremiumOrAdmin, createController);
router.put('/:id', checkAuth, isAdmin , updateController);
router.delete('/:id',checkAuth, isPremiumOrAdmin, deleteController);

export default router;
