import { useState } from "react";
import {
  Button,
  Code,
  Dot,
  Fieldset,
  Link,
  Row,
  Spacer,
  Tag,
  useClipboard,
  useToasts,
} from "@geist-ui/react";
import { Clipboard } from "@geist-ui/react-icons";
import getBaseURL from "../../utilities/getBaseURL";

export default function Quiz({ quiz, revalidate }) {
  const { copy } = useClipboard();
  const [loading, setLoading] = useState(false);
  const [, setToasts] = useToasts();

  async function start() {
    setLoading(true);
    try {
      await fetch("/api/quiz/start", {
        method: "PATCH",
        body: JSON.stringify({ id: quiz.id }),
      });
      revalidate();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }
  async function finish() {
    setLoading(true);
    try {
      await fetch("/api/quiz/finish", {
        method: "PATCH",
        body: JSON.stringify({ id: quiz.id }),
      });
      revalidate();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }

  const actions = [
    {
      label: "Start",
      type: "success",
      process: start,
      condition: quiz.started === false,
    },
    {
      label: "Finish",
      type: "warning",
      process: finish,
      condition: quiz.started === true && quiz.finished === false,
    },
    {
      label: "Delete",
      type: "error",
      process: () => {},
      condition: quiz.started && quiz.finished,
    },
  ];

  return (
    <Fieldset style={{ marginBottom: "2vh" }}>
      <Fieldset.Content>
        <Fieldset.Title>
          <Row align="middle" justify="start">
            <Button
              icon={<Clipboard />}
              size="mini"
              auto
              onClick={() => {
                copy(`${getBaseURL()}/q/${quiz.id}`);
                setToasts({
                  text: "Quiz path copied to clipboard.",
                  type: "success",
                });
              }}
            />
            <Spacer x={0.5} inline />
            <Link
              href={`${getBaseURL()}/q/${quiz.id}`}
              target="_blank"
              icon
              color
            >
              {quiz.title}
            </Link>
          </Row>
        </Fieldset.Title>
        <Fieldset.Subtitle>
          {quiz.started ? (
            quiz.finished ? (
              <Dot type="error">Finished</Dot>
            ) : (
              <Dot type="warning">In Progress</Dot>
            )
          ) : (
            <Dot>Not Started</Dot>
          )}
        </Fieldset.Subtitle>
        <Row align="middle" justify="start">
          <Tag>
            ID <Code>{quiz.id}</Code>
          </Tag>
          <Spacer x={0.5} inline />
          <Tag>
            {quiz.questions.length} Question{`(s)`}
          </Tag>
        </Row>
      </Fieldset.Content>
      <Fieldset.Footer>
        <Fieldset.Footer.Actions>
          {actions.map(
            (action) =>
              action.condition && (
                <Button
                  key={action.label}
                  auto
                  type={action.type}
                  loading={loading}
                  onClick={action.process}
                >
                  {action.label}
                </Button>
              )
          )}
        </Fieldset.Footer.Actions>
      </Fieldset.Footer>
    </Fieldset>
  );
}
