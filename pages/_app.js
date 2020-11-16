import Head from "next/head";
import {
  GeistProvider,
  CssBaseline,
  Page,
  Row,
  Spacer,
  Link,
  Divider,
} from "@geist-ui/react";
import { Github, Instagram, Twitter } from "@geist-ui/react-icons";
import Navbar from "../components/Navbar";
import { Provider as NextAuthProvider } from "next-auth/client";

export default function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <GeistProvider
        theme={{
          type: "dark",
        }}
      >
        <Head>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
          <title>Quiz Ming</title>
        </Head>
        <CssBaseline />
        <Page>
          <Navbar />
          <Page.Content>
            <Component {...pageProps} />
            <Spacer y={3} />
          </Page.Content>
          <Page.Footer>
            <Divider />
            <Row align="middle" justify="center">
              🛠 and ⛑ by Vaibhav Acharya
            </Row>
            <Spacer y={0.25} />
            <Row align="middle" justify="center">
              <Link
                href="https://wwww.github.com/VaibhavAcharya/"
                target="_blank"
              >
                <Github size={18} />
              </Link>
              <Spacer inline x={0.5} />
              <Link
                href="https://wwww.instagram.com/vaibhavacharya_/"
                target="_blank"
              >
                <Instagram size={18} />
              </Link>
              <Spacer inline x={0.5} />
              <Link
                href="https://wwww.twitter.com/VaibhavAcharya_/"
                target="_blank"
              >
                <Twitter size={18} />
              </Link>
            </Row>
            <Spacer y />
          </Page.Footer>
        </Page>
      </GeistProvider>
    </NextAuthProvider>
  );
}
