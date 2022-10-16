import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const token = req.headers.token;
  const user = await verify(token);
  if (user) {
    let _ = await prisma.courses.findUnique({
      where: {
        courseName: body.courseName,
      },
      include: {
        courseware: true,
      },
    });

    res.status(200).json({ coursewares: _.courseware });
    return;
  }
  res.status(403).json();
  return;
}
