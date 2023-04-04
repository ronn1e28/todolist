const TodoService = require("../services/todo.service");
const NotFoundException = require("../exceptions/NotFoundException");
import { Request, Response, NextFunction } from "express";
import { RequestWithUser } from "../types";


class TodoController {
  async get(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.user) {
        const data = await TodoService.get(req.user.user_id);
        return res.status(200).json(data);
      }
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({
          message: err.message,
        });
      }
    }
  }

  async store(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      if (req.user) {
        const data = await TodoService.store(req.body, req.user.user_id);
        return res.status(200).json({ message: "Success", data });
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({
          message: err.message,
        });
      }
    }
  }

  async update(req: RequestWithUser, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    try {
      const result = await TodoService.getByID(id);
      if (!result) {
        throw new NotFoundException("Todo not found");
      }
      const data = await TodoService.update(id, req.body);
      return res.status(200).json({
        message: "Updated",
        data,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({
          message: err.message,
        });
      }
    }
  }

  async remove(req: RequestWithUser, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    try {
      const result = await TodoService.getByID(id);
      if (!result) {
        throw new NotFoundException("Todo not found");
      }
      const data = await TodoService.remove(id);
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({
          message: err.message,
        });
      }
    }
  }

  async getByID(req: RequestWithUser, res: Response, next: NextFunction) {
    const id = Number(req.params.id);
    try {
      const result = await TodoService.getByID(id);
      if (!result) {
        throw new NotFoundException("Todo not found");
      }
      return res.status(200).json({ message: "Success", result });
    } catch (err) {
      console.log("err", err);
      if (err instanceof Error) {
        console.log(err.message);
        return res.status(400).json({
          message: err.message,
        });
      }
    }
  }
}

const TodoControllerObj = new TodoController();

module.exports = TodoControllerObj;
