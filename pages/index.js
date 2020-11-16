import { Button, Card, Display, Image, Row, Spacer, Tabs, Text } from "@geist-ui/react";
import Link from "next/link";

export default function Index() {
  return (
    <>
      <Text h3 type="secondary">
        Faster. Smarter. Better.
      </Text>
      <Text h2>Modern quiz's for efficient teachers.</Text>
      <Spacer y />
      <Link href="/authenticate">
        <Button type="success">Get Started Now</Button>
      </Link>
      <Spacer y />
      <Tabs initialValue="1">
        <Spacer y />
        <Tabs.Item label="Fast Creation" value="1">
      <Image.Browser url="/new">
        <Image src="/Fast Creation.png" />
      </Image.Browser>
      </Tabs.Item>
        <Tabs.Item label="Easy Management" value="2">
      <Image.Browser url="/dashboard">
        <Image src="/Easy Management.png" />
      </Image.Browser>
      </Tabs.Item>
      </Tabs>
    </>
  );
}
