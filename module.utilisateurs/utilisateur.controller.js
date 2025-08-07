import { inscriptionJoiSchema } from "../validators/utilisateur.validator.js";

class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.createUser = this.createUser.bind(this);
    this.patchUser = this.patchUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  // Création utilisateur
  async createUser(req, res, next) {
    try {
      // Validation avec Joi
      const { error } = inscriptionJoiSchema.validate(req.body, { abortEarly: false });
      if (error) {
        error.status = 400;
        throw error;
      }

             const { nom, prenom, email, mot_de_passe } = req.body;

       // Création en base (le hachage se fait dans le repository)
       const newUser = await this.userRepository.createUser({
         nom,
         prenom,
         email,
         mot_de_passe
       });

      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }

  // Mise à jour utilisateur
  async patchUser(req, res, next) {
    try {
      const { id } = req.params;
      const { nom, prenom, email, mot_de_passe } = req.body;

      if (!id) {
        const err = new Error("ID utilisateur requis");
        err.status = 400;
        throw err;
      }

             const updatedUser = await this.userRepository.patchUser({
         id,
         nom,
         prenom,
         email,
         mot_de_passe
       });

      if (!updatedUser) {
        const err = new Error("Utilisateur non trouvé");
        err.status = 404;
        throw err;
      }

      res.status(200).json({ message: "Utilisateur mis à jour", id });
    } catch (error) {
      next(error);
    }
  }

  // Suppression utilisateur
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      if (!id) {
        const err = new Error("ID utilisateur requis");
        err.status = 400;
        throw err;
      }

      const result = await this.userRepository.deleteUser(id);

      if (!result) {
        const err = new Error("Utilisateur non trouvé");
        err.status = 404;
        throw err;
      }

      res.status(200).json({ message: "Utilisateur supprimé avec succès", id });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
