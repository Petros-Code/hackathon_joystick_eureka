class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.createUser = this.createUser.bind(this);
    this.patchUser = this.patchUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  async createUser(req, res, next) {
    const { nom, prenom, email, mot_de_passe } = req.body;
    
    try {
      if (!nom || !prenom || !email || !mot_de_passe) {
      const err = new Error("Champs obligatoires manquants");
      err.status = 400;
      throw err;
      }

      const newUser = await this.userRepository.createUser({ nom, prenom, email, mot_de_passe });
      res.status(201).json(newUser);
    } catch (error) {
      next(error); // Passer l'erreur au middleware global à vérifier via explication Marine, pour "attraper" l'erreur
    }
  }

  async patchUser(req, res, next) {
    try {
      const { id } = req.params;
      const { nom, prenom, email, mot_de_passe } = req.body;

      const result = await this.userRepository.patchUser({ id, nom, prenom, email, mot_de_passe })

      if (result.affectedRows === 0) {
        const err = new Error("Utilisateur non trouvé");
        err.status = 404;
        throw err;
      }

      res.status(200).json({ message: "Utilisateur mis à jour", id, nom, prenom, email });
    } catch (error) {
      next(error); //à vérifier plus tard quand errorHandler OK
    }
  }

  async deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const result = await this.userRepository.deleteUser(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json({ message: "Utilisateur supprimé avec succès", id });
  } catch (error) {
    next(error);
  }
}

}

export default UserController;