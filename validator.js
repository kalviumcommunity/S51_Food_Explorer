const Joi = require("joi")
const validator = (schema) => (data) => 
    schema.validate(data, {abortEarly: false})

const postUpdateSchema = Joi.object({
    FoodID: Joi.string().required(),
    Name: Joi.string().required(),
    Cuisine: Joi.string().required(),
    Country: Joi.string().required(),
    City: Joi.string().required(),
    MainIngredients: Joi.string().required(),
    Type: Joi.string().required(),
    Taste: Joi.string().required(),
    CreatedBy: Joi.string().required()
})

const updateAndPostValidator = validator(postUpdateSchema)
module.exports = updateAndPostValidator
