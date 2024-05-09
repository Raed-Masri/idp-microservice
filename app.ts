import express, { Application } from "express";

import connectDB from "./src/config/mongoDB";
import { userRoutes } from "./src/routes/user.route";

require('dotenv').config();

const app: Application = express();
const port = process.env.PORT || 3001;

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
