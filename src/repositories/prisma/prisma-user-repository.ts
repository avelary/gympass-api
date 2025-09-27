import { prisma } from "@/shared/database/prisma";
import { Prisma } from "@prisma/client";
import type { UsersRepository } from "../interface-user-repository";

export class PrismaUsersRepository implements UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({ where: { email } })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findFirst({ where: {id} })

    return user
  }
}