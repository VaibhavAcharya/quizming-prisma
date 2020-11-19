import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function (req, res) {
  if (req.method === "GET") {
    const session = await getSession({ req });
    if (session) {
      const quiz = await prisma.quiz.findMany({
        where: {
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
