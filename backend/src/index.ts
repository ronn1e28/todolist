const todoRouter = require("./routes/todo.route");
const HttpException = require("./exceptions/HttpException");
// const usersRouter = require("./routes/users.route");
import VerifyToken from "./middlewares/VerifyToken";
const saveUserInfo = require("./middlewares/saveUserInfo");
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import usersRouter from "./routes/users.route";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

interface Error {
  status?: number;
  message?: string;
}

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(VerifyToken);
app.use(saveUserInfo);

app.use("/users", usersRouter);
app.use("/todo", todoRouter);

// handle exceptions
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpException) {
    if (err.status) {
      return res.status(err.status).json({ message: err.message });
    }
  }
  console.log("err", err);
  return res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

module.exports = app;
