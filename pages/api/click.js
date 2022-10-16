import prisma from "../../db/prisma";

// add a operation sequence
export default async function handler(req, res) {
  const body = JSON.parse(req.body);
  let result = null;
  try {
    result = await prisma.operationSequence.create({
      data: body,
    });
  } catch (e) {
    console.log(typeof e);
    // console.error(`Create operation sequence error. ${e}`);
  } finally {
  }

  res.status(200).json(result);
  return;
}
