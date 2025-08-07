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
    try {
      const [rows] = await this.pool.query("SELECT * FROM commentaires");
      return rows;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des commentaires : " + error.message
      );
    }
  }
  
  // get commentaire ById
  async getCommentaireById(id) {
    try {
      const [rows] = await this.pool.query(
        "SELECT * FROM commentaires WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération du commentaire : " + error.message
      );
    }
  }
  // supprimer un commentaire
  async deleteCommentaire(id) {
    try {
      const [result] = await this.pool.query(
        "DELETE FROM commentaires WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        "Erreur lors de la suppression du commentaire : " + error.message
      );
    }
  }
}
export default CommentaireRepository;
