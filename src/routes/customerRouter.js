import express from 'express';
import { getCustomerById, getCustomers, postCustomers, putCustomers } from '../controllers/customersController.js';



const customersRouter = express.Router();
customersRouter.get("/customers", getCustomers);
customersRouter.get("/customers/:id", getCustomerById);
customersRouter.post("/customers",postCustomers)
customersRouter.put("/customers/:cpf",putCustomers)


export default customersRouter