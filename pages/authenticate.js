import { Text } from "@geist-ui/react";
import { getSession } from "next-auth/client";

export default function Authenticate() {
  return (
    <>
      <Text h2>Authenticate</Text>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
      },
    };
  } else {
    return {
      redirect: {
        destination: "/api/auth/signin",
      },
    };
  }
}
