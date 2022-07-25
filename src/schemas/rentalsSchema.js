import joi from "joi";

const rentalsSchema = joi.object({
   
   gameId: joi.number().min(1).required(),
   customerID: joi.number().min(1).required(),
   daysRented: joi.number().min(1).required()

});

export default rentalsSchema

