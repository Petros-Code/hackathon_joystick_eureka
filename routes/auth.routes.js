import express from "express";
import AuthController from "../module.authentification/auth.controller.js";
import AuthRepository from "../module.authentification/auth.repository.js";
import validate from "../middlewares/validate.middleware.js";
import { loginJoiSchema } from "../validators/utilisateur.validator.js";

const router = express.Router();

export default (pool) => {
  const authRepository = new AuthRepository(pool);
  const authController = new AuthController(authRepository);

  router.post("/login", validate(loginJoiSchema), authController.login.bind(authController));
  router.post("/logout", authController.logout.bind(authController));

  return router;
};
