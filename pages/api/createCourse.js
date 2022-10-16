import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const token = req.headers.token;
  const user = await verify(token);
  const body = JSON.parse(req.body);
  if (user && body.courseName) {
    const _ = await prisma.courses.create({
      data: {
        courseName: body.courseName,
        teacherName: user.username,
      },
    });
    if (_) res.status(200).json();
    else res.status(403).json();
    return;
  }
  res.status(403).json();
  return;
}
