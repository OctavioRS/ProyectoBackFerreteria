import * as prodfakeController from "../controllers/productsfake.controller.js";
import { Router } from "express";
const router = Router();

router.post("/create", prodfakeController.createProd);
router.get("/", prodfakeController.getProds);

export default router;