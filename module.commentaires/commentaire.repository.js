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
  // get all commentaires
  async getAllCommentaires() {
    const [rows] = await this.pool.query("SELECT * FROM commentaires");
    return rows;
  }
  // get all commentaires ById
  async getCommentaireById(id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM commentaires WHERE id = ?",
      [id]
    );
    return rows[0]; // un seul commentaire
  }
}

export default CommentaireRepository;
