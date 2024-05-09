import { Router } from "express";

import {
  getUserByEmailController,
  signInController,
  signUpController,
  updateUserByEmailController,
} from "../controllers/user.controller";
import { validate, verifyToken } from "../middlewares/middleware";
import {
  signInScheme,
  signUpScheme,
  getUserScheme,
  updateUserScheme,
} from "../validations/user.validation";

const userRoutes = Router();

userRoutes.post("/sign-in", validate(signInScheme), signInController);
userRoutes.post("/sign-up", validate(signUpScheme), signUpController);

userRoutes.get(
  "/:email",
  verifyToken,
  validate(getUserScheme),
  getUserByEmailController
);

userRoutes.patch(
  "/update",
  verifyToken,
  validate(updateUserScheme),
  updateUserByEmailController
);

export { userRoutes };
