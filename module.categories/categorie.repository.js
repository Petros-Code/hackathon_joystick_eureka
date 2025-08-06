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
}

export default CategorieRepository;
