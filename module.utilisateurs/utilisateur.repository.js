class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createUser({ nom, prenom, email, mot_de_passe }) {
    try {
      const [result] = await this.pool.query(
        'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, mot_de_passe]
      );
      return { id: result.insertId, email, nom, prenom };
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
  }
}

export default UserRepository;