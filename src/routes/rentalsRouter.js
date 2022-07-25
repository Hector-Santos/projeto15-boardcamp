import express from 'express';
import { getRentals, postRentals, postReturn } from '../controllers/rentalsController.js';


const rentalsRouter = express.Router();
rentalsRouter.get("/rentals", getRentals);
rentalsRouter.post("/rentals", postRentals);
rentalsRouter.post("/rentals/:id/return", postReturn);



export default rentalsRouter