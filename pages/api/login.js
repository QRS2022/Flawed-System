import prisma from "../../db/prisma";

const jwt = require("jsonwebtoken");
const secretKey = "&*^R*G&(FRDwp4eg3";

export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  const user = await prisma.user.findMany({
    where: {
      username: body.username,
      password: body.password,
    },
  });
  if (user.length > 0) {
    const token = await jwt.sign(
      {
        username: body.username,
      },
      secretKey,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({ token });
    return;
  } else {
    res.status(200).json({ token: null });
    return;
  }
}
