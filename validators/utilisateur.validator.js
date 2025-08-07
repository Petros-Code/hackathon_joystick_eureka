import Joi from "joi";

const emailMessages = {
    "string.email": "L'email doit être une adresse valide",
        "string.min": "L'email doit contenir au moins 8 caractères",
        "any.required": "Un email est requis",
        "string.empty": "L'email ne peut pas être vide",
};

const passwordMessages = {
    "string.min": "Le mot de passe doit contenir au moins 8 caractères",
        "any.required": "Mot de passe requis",
        "string.empty": "Le mot de passe ne peut pas être vide",
};

const inscriptionJoiSchema = Joi.object({
    email: Joi.string().email().trim().min(8).required().messages(emailMessages),

    mot_de_passe: Joi.string().trim().min(8).required().messages(passwordMessages),

    nom: Joi.string().trim().min(2).required().messages({
        "string.min": "Le nom doit contenir au moins 2 caractères",
        "any.required": "Nom requis",
        "string.empty": "le nom ne peut pas être vide",
    }),

    prenom: Joi.string().trim().min(2).required().messages({
        "string.min": "Le prénom doit contenir au moins 2 caractères",
        "any.required": "Prénom requis",
        "string.empty": "le prénom ne peut pas être vide",
    }),
});

const connexionJoiSchema = Joi.object({
    email: Joi.string().email().trim().min(8).required().messages(emailMessages),

    mot_de_passe: Joi.string().trim().min(8).required().messages(passwordMessages),

});

export { inscriptionJoiSchema, connexionJoiSchema }; //route de connexion à finir