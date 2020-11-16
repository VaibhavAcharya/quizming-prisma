import prisma from "../../lib/prisma";

export default function Quiz() {
  return 'Hey!'
}

export async function getServerSideProps(ctx) {
  const quiz = await prisma.quiz.findOne({
    where: {
      id: Number(ctx.query.id) || -1,
    },
  });

  return {
    props: { quiz: JSON.parse(JSON.stringify(quiz)) },
  };
}
