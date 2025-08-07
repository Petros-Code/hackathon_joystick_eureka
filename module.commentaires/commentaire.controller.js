class CommentaireController {
  constructor(commentaireRepository) {
    this.commentaireRepository = commentaireRepository;
    this.createCommentaire = this.createCommentaire.bind(this);
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
}

export default CommentaireController;
