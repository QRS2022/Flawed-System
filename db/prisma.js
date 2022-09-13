import { PrismaClient } from "@prisma/client";

let prisma;

if (global.prisma) {
  prisma = global.prisma;
} else {
  global.prisma = new PrismaClient();
  prisma = global.prisma;
}

export default prisma;
