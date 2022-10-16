import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const token = req.headers.token;
  const user = await verify(token);
  const body = JSON.parse(req.body);
  if (user) {
    const course = await prisma.courses.findUnique({
      where: {
        courseName: body.courseName,
      },
    });

    const _ = await prisma.studentsOnCourses.create({
      data: {
        username: user.username,
        courseName: course.courseName,
      },
    });
    res.status(200).json({ res: true });
    return;
  }
  res.status(403).json({ res: false });
  return;
}
