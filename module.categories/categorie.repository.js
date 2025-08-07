class CategorieRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createCategorie({ nom }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO categories (nom) VALUES (?)",
        [nom]
      );
      return { id: result.insertId, nom };
    } catch (error) {
      throw new Error(
        "Erreur lors de la création de la catégorie : " + error.message
      );
    }
  }
  // get
  async getAllCategories() {
    try {
      const [rows] = await this.pool.query("SELECT id, nom FROM categories");
      return rows;
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération des catégories : " + error.message
      );
    }
  }

  //getById
  async getCategorieById(id) {
    try {
      const [rows] = await this.pool.query(
        "SELECT id, nom FROM categories WHERE id = ?",
        [id]
      );
      return rows[0];
    } catch (error) {
      throw new Error(
        "Erreur lors de la récupération de la catégorie : " + error.message
      );
    }
  }

  // updateCategorie
  async updateCategorie(id, { nom }) {
    try {
      const [result] = await this.pool.query(
        "UPDATE categories SET nom = ? WHERE id = ?",
        [nom, id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(
        "Erreur lors de la mise à jour de la catégorie : " + error.message
      );
    }
  }
  // Supprimer ById
  async deleteCategorie(id) {
    try {
      const [result] = await this.pool.query(
        "DELETE FROM categories WHERE id = ?",
        [id]
      );
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error("Erreur lors de la suppression : " + error.message);
    }
  }
}
export default CategorieRepository;
