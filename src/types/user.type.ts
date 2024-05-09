interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  dob: string;
  password: string;
}

interface IUserUpdate {
  email: string;
  firstName?: string;
  lastName?: string;
  dob?: string;
  password?: string;
}

interface IUserSignIn {
  email: string;
  password: string;
}

interface IUserByEmail {
  email: string;
}

interface TokenPayload {
  email: string;
}

interface AuthResponse {
  token: string;
}

interface ErrorResponse {
  error: string;
}

export {
  IUser,
  IUserSignIn,
  IUserUpdate,
  IUserByEmail,
  AuthResponse,
  ErrorResponse,
  TokenPayload,
};
