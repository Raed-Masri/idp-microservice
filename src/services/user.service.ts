import { UserModel } from "../models/user.model";
import { IUser, IUserUpdate } from "../types/user.type";

const addUserService = async (body: IUser) => {
  const addedUser = await UserModel.create(body);

  return addedUser;
};

const getUserByEmailService = async (email: string) => {
  const user = await UserModel.findOne({ email });

  return user;
};
const getUserByEmailWithoutPass = async (email: string) => {
  const user = await UserModel.findOne({ email }).select('-password');

  return user;
};

const updateUserByEmailService = async (body: IUserUpdate) => {
  const { email } = body;
  await UserModel.updateOne({ email }, body);

  return "user updated";
};

export { addUserService, getUserByEmailService, updateUserByEmailService, getUserByEmailWithoutPass };
