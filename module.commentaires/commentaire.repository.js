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
  // get commentaire ById
  async getCommentaireById(id) {
    const [rows] = await this.pool.query(
      "SELECT * FROM commentaires WHERE id = ?",
      [id]
    );
    return rows[0];
  }
  // supprimer un commentaire
  async deleteCommentaire(id) {
    try {
      const [result] = await this.pool.query(
        "DELETE FROM commentaires WHERE id = ?",
        [id]
      );
      //return result.affectedRows > 0; // ?
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du commentaire : " + error.message
      );
    }
  }
}
export default CommentaireRepository;
