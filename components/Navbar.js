import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Page,
  Row,
  Avatar,
  Spacer,
  Button,
  ButtonDropdown,
  Link,
} from "@geist-ui/react";
import { useSession } from "next-auth/client";

export default function Navbar() {
  const [session] = useSession();
  const { pathname: currentPath, push: navigate } = useRouter();

  return (
    <Page.Header style={{ paddingTop: "2vh" }}>
      <Row align="middle" justify="space-between">
        <NextLink href="/">
          <Link>
            <Row align="middle" justify="start">
              <Avatar src="/favicon.png" />
              <Spacer inline x={0.5} />
              Quiz Ming
            </Row>
          </Link>
        </NextLink>
        <Row align="middle" justify="end">
          {!session?.user ? (
            currentPath === "/authenticate" ? (
              <Button auto size="small" onClick={() => navigate("/")}>
                Home
              </Button>
            ) : (
              <Button
                auto
                size="small"
                onClick={() => navigate("/authenticate")}
              >
                Get Started
              </Button>
            )
          ) : (
            <ButtonDropdown auto size="small">
              <ButtonDropdown.Item
                main={["/", "/new"].includes(currentPath)}
                onClick={() => navigate("/dashboard")}
              >
                Dashboard
              </ButtonDropdown.Item>
              <ButtonDropdown.Item
                main={currentPath === "/dashboard"}
                onClick={() => navigate("/new")}
              >
                Create Quiz
              </ButtonDropdown.Item>
              <ButtonDropdown.Item
                onClick={() => navigate("/api/auth/signout")}
              >
                Logout
              </ButtonDropdown.Item>
            </ButtonDropdown>
          )}
        </Row>
      </Row>
    </Page.Header>
  );
}
