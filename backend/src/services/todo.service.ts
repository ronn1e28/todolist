import { PrismaClient } from "@prisma/client";

interface Todotype {
  content: string;
  completed: boolean;
  user_id: string;
}

class TodoService {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async get(user_id: string) {
    return this.prisma.todo.findMany({
      where: {
        user_id: user_id,
      },
    });
  }

  async store(req: Todotype, user_id: string) {
    return this.prisma.todo.create({
      data: { content: req.content, completed: false, user_id: user_id },
    });
  }

  async remove(id: number) {
    // await this.getByID(id)
    const result = await this.prisma.todo.delete({
      where: {
        id: id,
      },
    });
    return result;
  }

  async update(id: number, req: Todotype) {
    // await this.getByID(id)
    const result = await this.prisma.todo.update({
      where: {
        id: id,
      },
      data: req,
    });
    return result;
  }

  async getByID(id: number) {
    const result = await this.prisma.todo.findUnique({
      where: {
        id: id,
      },
    });
    return result;
  }
}

const TodoServiceObj = new TodoService();

module.exports = TodoServiceObj;
