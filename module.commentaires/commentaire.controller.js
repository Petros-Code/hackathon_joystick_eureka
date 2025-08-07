class CommentaireController {
  constructor(commentaireRepository) {
    this.commentaireRepository = commentaireRepository;
    this.createCommentaire = this.createCommentaire.bind(this);
    this.getAllCommentaires = this.getAllCommentaires.bind(this);
    this.getCommentaireById = this.getCommentaireById.bind(this);
    this.deleteCommentaire = this.deleteCommentaire.bind(this);
  }

  async createCommentaire(req, res, next) {
    const { id_utilisateurs, id_idee, titre, corps_de_texte } = req.body;

    try {
      // Validation des champs requis
      if (!id_utilisateurs || !id_idee || !titre || !corps_de_texte) {
        const err = new Error("Tous les champs sont requis (id_utilisateurs, id_idee, titre, corps_de_texte)");
        err.status = 400;
        throw err;
      }

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

  // supprimer un commentaire
  async deleteCommentaire(req, res, next) {
    const { id } = req.params;

    try {
      if (!id) {
        const err = new Error("ID du commentaire requis");
        err.status = 400;
        throw err;
      }

      const deleted = await this.commentaireRepository.deleteCommentaire(id);
      if (!deleted) {
        const err = new Error("Commentaire non trouvé");
        err.status = 404;
        throw err;
      }
      res.status(200).json({ message: "Commentaire supprimé avec succès", id });
    } catch (error) {
      next(error);
    }
  }
}
export default CommentaireController;
