import argon2 from "argon2";

class AuthRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async getUserByEmail(email) {
    try {
      const [rows] = await this.pool.query("SELECT * FROM utilisateurs WHERE email = ?", [email]);
      return rows[0];
    } catch (err) {
      const error = new Error("Erreur lors de la récupération de l'utilisateur.");
      error.status = 500;
      throw error;
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
}

export default AuthRepository;
