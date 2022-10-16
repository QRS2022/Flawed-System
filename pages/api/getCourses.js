import prisma from "../../db/prisma";
import verify from "./verify";

export default async function handler(req, res) {
  const token = req.headers.token;
  const user = await verify(token);
  if (user) {
    let _ = await prisma.courses.findMany({
      where: {
        teacherName: user.username,
      },
    });

    let __ = await prisma.studentsOnCourses.findMany({
      where: {
        username: user.username,
      },
    });

    _ = _.map((item) => {
      return {
        ...item,
        category: "teach",
      };
    });

    __ = __.map((item) => {
      return {
        ...item,
        category: "learn",
      };
    });

    res.status(200).json({ courses: [..._, ...__] });
    return;
  }
  res.status(403).json();
  return;
}
