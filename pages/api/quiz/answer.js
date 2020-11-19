import prisma from "../../../lib/prisma";

export default async function (req, res) {
  if (req.method === "PATCH") {
    const { body } = req;
    const data = JSON.parse(body);

    let { candidates } = await prisma.quiz.findOne({
      where: {
        id: data.id,
      },
    });

    if (!candidates) {
      candidates = [];
    }

    if (!candidates.find(({ email }) => email === data.answer.email)) {
      const quiz = await prisma.quiz.update({
        where: {
          id: data.id,
        },
        data: {
          candidates: [...candidates, data.answer],
        },
      });

      res.json(quiz);
    } else {
      throw Error("A candidate with this email already exists.");
    }
  } else {
    throw Error("This method is not supported here.");
  }
}
