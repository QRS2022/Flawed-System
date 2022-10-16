import prisma from "../../db/prisma";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const result = await prisma.courses.findUnique({
    where: {
      courseName: body.courseName,
    },
  });
  if (result) {
    const course = await prisma.studentsOnCourses.findMany({
      where: {
        AND: [
          {
            username: body.username,
          },
          {
            courseName: body.courseName,
          },
        ],
      },
    });
    if (course.length > 0) {
      // 如果是学生
      res.status(200).json({ course: result, jump: true });
      return;
    } else {
      // 如果是老师
      const _course = await prisma.courses.findMany({
        where: {
          AND: [
            {
              teacherName: body.username,
            },
            {
              courseName: body.courseName,
            },
          ],
        },
      });
      if (_course.length > 0) {
        res.status(200).json({ course: result, jump: true });
        return;
      } else {
        res.status(200).json({ course: result, jump: false });
        return;
      }
    }
  } else {
    res.status(200).json({ course: null });
    return;
  }
}
