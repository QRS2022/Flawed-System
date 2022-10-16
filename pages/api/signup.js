import prisma from "../../db/prisma";

// count a blue click
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const emailRegex = new RegExp(
    "^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
  );
  const usernameRegex = new RegExp("^[a-zA-Z].*");
  const usernameCheck = usernameRegex.test(body.username);
  const emailCheck = emailRegex.test(body.email);
  const passwordCheck = body.password.length >= 6;
  const result = await prisma.user.findMany({
    where: {
      username: body.username,
    },
  });
  if (result.length > 0) {
    res.status(403).json(null);
    return;
  } else {
    if (usernameCheck && emailCheck && passwordCheck) {
      const secondRes = await prisma.user.create({
        data: {
          ...body,
        },
      });
      res.status(200).json(secondRes);
      return;
    } else {
      res.status(403).json(null);
      return;
    }
  }
}
