class CategorieRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createCategorie({ id, nom }) {
    try {
      const [result] = await this.pool.query(
        "INSERT INTO categories (id, nom) VALUES (?, ?)",
        [id, nom]
      );
      return { id: result.insertId, id, nom };
    } catch (error) {
      throw new Error(
        "Erreur lors de la création de la catégories : " + error.message
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
    const [rows] = await this.pool.query(
      "SELECT id, nom FROM categories WHERE id = ?",
      [id]
    );
    return rows[0];
  }
}
export default CategorieRepository;
