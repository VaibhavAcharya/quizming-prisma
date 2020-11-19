import { getSession } from "next-auth/client";
import useSWR from "swr";
import Quiz from "../components/dashboard/Quiz";
import { Spacer, Tag } from "@geist-ui/react";

export default function Dashboard() {
  const { data: quizzes, error: err, isValidating, mutate } = useSWR(
    "/api/quiz",
    (url) =>
      fetch(url, {
        method: "GET",
      }).then((res) => res.json())
  );

  return (
    <>
      <Tag>
        Status:{" "}
        {isValidating ? (quizzes ? "Revalidating" : "Fetching") : "Updated"}
      </Tag>
      <Spacer y />
      {quizzes &&
        quizzes
          .sort((a, b) => b.id - a.id)
          .map((quiz) => (
            <Quiz key={quiz.id} {...{ quiz, revalidate: mutate }} />
          ))}
      {!isValidating &&
        !(quizzes?.length >= 1) &&
        "You currently have 0 quizzes. Please create a quiz to get started!"}
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return {
      props: {},
    };
  } else {
    return {
      redirect: {
        destination: "/authenticate",
      },
    };
  }
}
