class CommentaireRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createCommentaire({ id_utilisateurs, id_idee, titre, corps_de_texte }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO commentaires (id_utilisateurs, id_idee, titre, corps_de_texte) VALUES (?, ?, ?, ?)",
        [id_utilisateurs, id_idee, titre, corps_de_texte]
      );
      return {
        id: result.insertId,
        id_utilisateurs,
        id_idee,
        titre,
        corps_de_texte,
      };
    } catch (error) {
      throw new Error(
        "Erreur lors de la création du commentaire : " + error.message
      );
    }
  }
}

export default CommentaireRepository;
