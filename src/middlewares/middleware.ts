import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyAccessToken = (token: any) => {
  const secret = process.env.SECRET_TOKEN as any;

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};

const verifyToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401);
  }

  const result = verifyAccessToken(token);

  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
};

const validate = (schema: any, types = ["body", "query", "params"]) => {
  return (req: any, res: any, next: any) => {
    const data = {};
    types.forEach((type) => {
      switch (type) {
        case "params":
          Object.assign(data, req.params);
          break;
        case "query":
          Object.assign(data, req.query);
          break;
        default:
          Object.assign(data, req.body);
      }
    });

    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export { verifyToken, validate };
