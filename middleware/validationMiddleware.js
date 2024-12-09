const Joi = require('joi');

const validateProduct = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        price: Joi.number().positive()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: 'Validazione fallita', 
            details: error.details 
        });
    }
    next();
};

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        nome: Joi.string().required(),
        cognome: Joi.string().required(),
        email: Joi.string().email().required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: 'Validazione fallita', 
            details: error.details 
        });
    }
    next();
};

const validateOrder = (req, res, next) => {
    const schema = Joi.object({
        products: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
            .min(1)
            .required()
            .messages({
                'string.pattern.base': 'ID prodotto non valido',
                'array.min': 'È richiesto almeno un prodotto',
            }),

        users: Joi.array()
            .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
            .min(1)
            .required()
            .messages({
                'string.pattern.base': 'ID utente non valido',
                'array.min': 'È richiesto almeno un utente',
            }),

        totalPrice: Joi.number()
            .positive()
            .required()
            .messages({
                'number.positive': 'Il prezzo deve essere positivo'
            })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ 
            message: 'Validazione fallita', 
            details: error.details 
        });
    }
    next();
};

module.exports = {
    validateProduct,
    validateUser,
    validateOrder
};