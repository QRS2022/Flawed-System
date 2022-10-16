import prisma from "../../db/prisma";

// count a blue click
export default async function handler(req, res) {
  const enterTick = req.headers.entertick;
  const body = JSON.parse(req.body);
  const result = await prisma.blueClickCount.findMany({
    where: {
      AND: [
        {
          widget: body.widget,
        },
        {
          enterTick: enterTick,
        },
      ],
    },
  });
  let secondResult;
  if (result.length > 0) {
    secondResult = await prisma.blueClickCount.update({
      where: {
        clickId: result[0].clickId,
      },
      data: {
        count: result[0].count + 1,
      },
    });
  } else {
    secondResult = await prisma.blueClickCount.create({
      data: {
        enterTick: enterTick,
        widget: body.widget,
        count: 1,
      },
    });
  }
  res.status(200).json(secondResult);
  return;
}
