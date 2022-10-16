import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  let _ = await prisma.operationSequence.deleteMany({});
  res.status(200).json({ res: true });
  return;
}
