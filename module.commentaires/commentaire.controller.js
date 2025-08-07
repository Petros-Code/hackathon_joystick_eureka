class CommentaireController {
  constructor(commentaireRepository) {
    this.commentaireRepository = commentaireRepository;
    this.createCommentaire = this.createCommentaire.bind(this);
    this.getAllCommentaires = this.getAllCommentaires.bind(this);
    this.getCommentaireById = this.getCommentaireById.bind(this);
  }

  async createCommentaire(req, res, next) {
    const { id_utilisateurs, id_idee, titre, corps_de_texte } = req.body;

    try {
      const newCommentaire = await this.commentaireRepository.createCommentaire(
        {
          id_utilisateurs,
          id_idee,
          titre,
          corps_de_texte,
        }
      );
      res.status(201).json(newCommentaire);
    } catch (error) {
      next(error);
    }
  }
  // get All commentaires
  async getAllCommentaires(req, res, next) {
    try {
      const commentaires =
        await this.commentaireRepository.getAllCommentaires();
      res.status(200).json(commentaires);
    } catch (error) {
      next(error);
    }
  }
  // get commentaire ById
  async getCommentaireById(req, res, next) {
    const { id } = req.params;
    try {
      const commentaire = await this.commentaireRepository.getCommentaireById(
        id
      );
      if (!commentaire) {
        return res.status(404).json({ message: "Commentaire non trouvé" });
      }
      res.status(200).json(commentaire);
    } catch (error) {
      next(error);
    }
  }
}

export default CommentaireController;
