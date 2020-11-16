import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
import prisma from "../../../lib/prisma";

const options = {
  providers: [
    Providers.Email({
      server: process.env.SMTP_SERVER,
      from: process.env.SMTP_FROM,
    }),
  ],

  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.SECRET_JWT,
    encryption: true,
  },

  adapter: Adapters.Prisma.Adapter({
    prisma,
  }),

  secret: process.env.SECRET,

  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        token.id = user.id;
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      // const quizes = await prisma.quiz.findMany({ where: { userId: token.id } })
      return Promise.resolve({
        ...session,
        user: { ...session.user, id: token.id },
      });
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
