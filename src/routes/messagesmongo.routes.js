import { Router } from 'express'

import {
    getControllerMsg,
    createControllerMsg,
    deleteControllerMsg,
} from '../controllers/messages.controllers.js';

const router = Router();

router.get('/', getControllerMsg);
router.post('/', createControllerMsg);
router.delete('/:id', deleteControllerMsg);

export default router;