import Joi from "joi";

export const createNoteSchema = Joi.object({
    title: Joi.string().required().min(8).max(20),
    content: Joi.string().required()    
})
