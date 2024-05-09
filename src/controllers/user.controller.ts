import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

require("dotenv").config();

import {
  IUser,
  IUserByEmail,
  IUserSignIn,
  IUserUpdate,
} from "../types/user.type";
import {
  addUserService,
  getUserByEmailService,
  getUserByEmailWithoutPass,
  updateUserByEmailService,
} from "../services/user.service";

const secretToken = process.env.SECRET_TOKEN as any;

const signUpController = async ({ body }: { body: IUser }, res: any) => {
  const { email, password } = body;

  try {
    const isExist = await getUserByEmailService(email);

    if (isExist) {
      res.status(409).send("User already exists");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      await addUserService({ ...body, password: hashedPassword });

      res.status(200).send("Sign up Successfull");
    }
  } catch (error) {
    return error;
  }
};

const signInController = async ({ body }: { body: IUserSignIn }, res: any) => {
  const { email, password } = body;

  try {
    const user = await getUserByEmailService(email);

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        const token = jwt.sign({ email: user.email }, secretToken);
        res.status(200).send({ token });
      } else {
        res.status(401).send("Password Incorrect");
      }
    } else {
      res.status(404).send("User Not Found");
    }
  } catch (error) {
    return error;
  }
};

const getUserByEmailController = async (
  { params }: { params: IUserByEmail },
  res: any
) => {
  const { email } = params;

  try {
    const user = await getUserByEmailWithoutPass(email);

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user profile not found");
    }
  } catch (error) {
    return error;
  }
};

const updateUserByEmailController = async (
  { body }: { body: IUserUpdate },
  res: any
) => {
  try {
    const updatedUser = await updateUserByEmailService(body);

    if (updatedUser) {
      res.status(200).send(updatedUser);
    } else {
      res.status(404).send("User Not Updated");
    }
  } catch (error) {
    return error;
  }
};

export {
  signUpController,
  signInController,
  getUserByEmailController,
  updateUserByEmailController,
};
