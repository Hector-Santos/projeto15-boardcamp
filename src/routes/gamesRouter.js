import express from 'express';
import { getGames, postGames } from '../controllers/gamesController.js';
import { verificaCategorias,verificaNomes } from '../middlewares/gamesMiddleware.js';


const gamesRouter = express.Router();
gamesRouter.get("/games", getGames);
gamesRouter.post("/games",verificaCategorias, verificaNomes, postGames)



export default gamesRouter