import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const token = req.headers.token;
  const user = await verify(token);
  if (user) {
    let _ = await prisma.messages.findMany({
      where: {
        ownerName: user.username,
      },
    });

    res.status(200).json({ messages: _ });
    return;
  }
  res.status(403).json();
  return;
}
