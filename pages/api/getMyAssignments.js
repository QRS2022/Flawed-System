import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const token = req.headers.token;
  const user = await verify(token);
  if (user) {
    let _ = await prisma.assignments.findMany({
      where: {
        AND: [
          {
            ownerName: body.username,
          },
          {
            theCourseName: body.courseName,
          },
        ],
      },
    });

    res.status(200).json({ assignments: _ });
  }
  res.status(403).json();
}
