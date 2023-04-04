import { PrismaClient } from "@prisma/client";
import { User } from "@prisma/client";

class UserService {
  private prisma;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async store(req: User) {
    const user = await this.prisma.user.findUnique({
      where: {
        user_id: req.user_id,
      },
    });

    if (!user) {
      await this.prisma.user
        .create({
          data: req,
        })
        .catch((err: Error) => {
          console.log(err);
        });
    }
  }
}

const UserServiceObj = new UserService();

module.exports = UserServiceObj;
