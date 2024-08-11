// this help our next js hot reload to not initialize prisma client every time it reloads
// it will only initialize it once and keep it in memory
// it is important to do it in development mode
// in production mode it is not necessary
//  there just do this export const prisma = new PrismaClient(); that it
// globalThis is not affected by hot reloadf
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if(process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}