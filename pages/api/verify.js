import prisma from "../../db/prisma";

const jwt = require("jsonwebtoken");
const secretKey = "&*^R*G&(FRDwp4eg3";

// if token valid, return the verified user object
export default async function handler(token) {
  const verification = await jwt.verify(token, secretKey);
  const result = await prisma.user.findUnique({
    where: {
      username: verification.username,
    },
    include: {
      messages: true,
    },
  });
  return result;
}
