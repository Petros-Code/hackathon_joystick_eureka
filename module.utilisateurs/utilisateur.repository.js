class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createUser({ nom, prenom, email, mot_de_passe }) {
    try {
      const [result] = await this.pool.query(
        'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, mot_de_passe, id]
      );
      return { id: result.insertId, email, nom, prenom };
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
  }

  async patchUser({ id, nom, prenom, email, mot_de_passe }) {
  try {
    const [result] = await this.pool.query(
      'UPDATE utilisateurs SET nom = ?, prenom = ?, email = ?, mot_de_passe = ? WHERE id = ?',
      [nom, prenom, email, mot_de_passe, id] 
    );

    if (result.affectedRows ===0) {
      throw new Error("Aucun utilisateur mis à jour, vérifier si existant.");
    }

    return { id, nom, prenom, email };
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de l'utilisateur : " + error.message);
  }
  }

  async deleteUser(id) {
  try {
    const [result] = await this.pool.query(
      'DELETE FROM utilisateurs WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      throw new Error(`Aucun utilisateur trouvé avec l'id ${id}`);
    }

    return { message: `Utilisateur avec l'id ${id} supprimé.` };
  } catch (error) {
    throw new Error("Erreur lors de la suppression de l'utilisateur : " + error.message);
  }
}



}

export default UserRepository;