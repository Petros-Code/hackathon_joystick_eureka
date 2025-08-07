import jwt from "jsonwebtoken";

class AuthController {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const user = await this.authRepository.getUserByEmail(email);
      if (!user) {
        const err = new Error("Identifiants invalides.");
        err.status = 401;
        throw err;
      }

      const isValid = await this.authRepository.verifyPassword(user.mot_de_passe, password);
      if (!isValid) {
        const err = new Error("Mot de passe incorrect.");
        err.status = 401;
        throw err;
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "3h" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 60 * 60 * 1000
      });

      res.status(200).json({
        message: "Connexion réussie",
        token,
        user: { id: user.id, email: user.email }
      });

    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.ENV === "production",
        sameSite: "strict"
      });

      res.status(200).json({ message: "Déconnexion réussie" });
    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;
