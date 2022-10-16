import prisma from "../../db/prisma";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
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
