import { getSession } from "next-auth/client";
import prisma from "../../../lib/prisma";

export default async function (req, res) {
  if (req.method === "PATCH") {
    const session = await getSession({ req });
    if (session) {
      const { body } = req;
      const data = JSON.parse(body);

      const { userId } = await prisma.quiz.findOne({
        where: {
          id: data.id
        }
      });
      if ( userId === session.user.id ) {
        const quiz = await prisma.quiz.update({
          where: {
            id: data.id,
          },
          data: {
            started: true,
          },
        });

        res.json(quiz);
      } else {
        throw Error("This quiz is not yours to start!")
      }
    } else {
      throw Error("Authentication required.");
    }
  } else {
    throw Error("This method is not supported here.");
  }
}
