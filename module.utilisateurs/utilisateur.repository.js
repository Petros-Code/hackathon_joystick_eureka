import argon2 from "argon2";

class UserRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async createUser({ nom, prenom, email, mot_de_passe }) {
    try {
      const hashedPassword = await argon2.hash(mot_de_passe);
      const [result] = await this.pool.query(
        'INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe) VALUES (?, ?, ?, ?)',
        [nom, prenom, email, hashedPassword]
      );
      return { id: result.insertId, email, nom, prenom };
    } catch (error) {
      throw new Error("Erreur lors de la création de l'utilisateur : " + error.message);
    }
  }

  async verifyPassword(hash, password) {
  try {
    return await argon2.verify(hash, password);
  } catch (err) {
    const error = new Error("Erreur lors de la vérification du mot de passe.");
    error.status = 500;
    throw error;
  }
}

  async patchUser({ id, nom, prenom, email, mot_de_passe }) {
  try {
    let hashedPassword;
    if (mot_de_passe) {
      hashedPassword = await argon2.hash(mot_de_passe);
    }
    const query = mot_de_passe
    ? "UPDATE utilisateurs SET nom = ?, prenom = ?, email = ?, mot_de_passe = ? WHERE id = ?"
    : "UPDATE utilisateurs SET nom = ?, prenom = ?, email = ? WHERE id = ?";
    const values = mot_de_passe
    ? [nom, prenom, email, hashedPassword, id]
    : [nom, prenom, email, id];
    
    const [result] = await this.pool.query(query, values);
     

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