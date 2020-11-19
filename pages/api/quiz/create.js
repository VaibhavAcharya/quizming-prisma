import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function (req, res) {
  if (req.method === "POST") {
    const session = await getSession({ req });
    if (session) {
      const { body } = req;
      const data = JSON.parse(body);
      const quiz = await prisma.quiz.create({
        data: {
          ...data,
          userId: session.user.id,
        },
      });

      res.json(quiz);
    } else {
      throw Error("Authentication required.");
    }
  } else {
    throw Error("This method is not supported here.");
  }
}
