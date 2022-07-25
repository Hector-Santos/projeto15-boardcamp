import express from 'express';
import rentalsRouter from './rentalsRouter.js';
import categoriesRouter from './categoriesRouter.js';
import gamesRouter from './gamesRouter.js';
import customersRouter from './customerRouter.js';




const router = express.Router();
router.use(rentalsRouter);
router.use(categoriesRouter);
router.use(gamesRouter)
router.use(customersRouter)




export default router;