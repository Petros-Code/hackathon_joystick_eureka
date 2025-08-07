class UserController {
  constructor(userRepository) {
    this.userRepository = userRepository;
    this.createUser = this.createUser.bind(this);
  }

  async createUser(req, res, next) {
    const { nom, prenom, email, mot_de_passe } = req.body;

    try {
      const newUser = await this.userRepository.createUser({ nom, prenom, email, mot_de_passe });
      res.status(201).json(newUser);
    } catch (error) {
      next(error); // Passer l'erreur au middleware global à vérifier via explication Marine, pour "attraper" l'erreur
    }
  }
}

export default UserController;