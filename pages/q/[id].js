import prisma from "../../lib/prisma";
import { useRouter } from "next/router";
import {
  Button,
  Card,
  Code,
  Description,
  Divider,
  Dot,
  Input,
  Radio,
  Row,
  Select,
  Spacer,
  Text,
  useToasts,
} from "@geist-ui/react";
import { useState } from "react";
import Result from "../../components/q/Result";

export default function Quiz({ quiz }) {
  const Router = useRouter();
  const [, setToasts] = useToasts();
  const statues = [
    {
      message: "Quiz is not started yet.",
      type: "",
      condition: !quiz?.started && !quiz?.finished,
    },
    {
      message: "Quiz is in progress.",
      type: "warning",
      condition: quiz?.started && !quiz?.finished,
    },
    {
      message: "Quiz has been finished.",
      type: "error",
      condition: quiz?.started && quiz?.finished,
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [answer, setAnswer] = useState({
    email: "",
    name: "",
    classification: "",
    answers: Object.fromEntries(
      quiz?.questions?.map((question) => [question.id, "1"]) || []
    ),
  });

  function mutateAnswer(field, value) {
    setAnswer((answer) => {
      if (field.startsWith("answer")) {
        let answersX = answer.answers;
        answersX[field[field.length - 1]] = value;

        return {
          ...answer,
          answers: answersX,
        };
      } else {
        return {
          ...answer,
          [field]: value,
        };
      }
    });
  }

  async function submit() {
    const isEmpty = (value) => !(value.length >= 1);
    const isEmailValid = (email) =>
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      );

    let ok = false;

    setIsSubmitting(true);

    if (
      isEmpty(answer.email) ||
      isEmpty(answer.name) ||
      isEmpty(answer.classification)
    ) {
      setToasts({ text: "Make sure you have no empty fields!", type: "error" });
    } else {
      if (!isEmailValid(answer.email)) {
        setToasts({ text: "Your email in invalid.", type: "error" });
      } else {
        if (
          (quiz.candidates || []).find(({ email }) => email === answer.email)
        ) {
          setToasts({
            text: "A candidate with this email already has exists.",
            type: "error",
          });
        } else {
          try {
            await fetch("/api/quiz/answer", {
              method: "PATCH",
              body: JSON.stringify({ id: quiz.id, answer: answer }),
            })
              .then(async () => {
                ok = true;
                await Router.push("/postsubmit");
              })
              .catch((e) => {
                setToasts({ text: e, type: "error" });
              });
          } catch (e) {
            setToasts({ text: e, type: "error" });
          }
        }
      }
    }

    !ok && setIsSubmitting(false);
  }

  return quiz ? (
    <>
      <Text h3>{quiz.title}</Text>
      {statues.map(
        (status) =>
          status.condition && (
            <Dot key={status.message} type={status.type}>
              {status.message}
            </Dot>
          )
      )}
      <Divider />
      {quiz.started ? (
        quiz.finished ? (
          <Result quiz={quiz} />
        ) : (
          <>
            <Input
              type="email"
              label="Email"
              size="large"
              placeholder="Eg. someone@gmail.com"
              width="100%"
              value={answer.email}
              onChange={({ target }) => {
                mutateAnswer("email", target.value);
              }}
            />
            <Spacer y={0.5} />
            <Input
              label="Name"
              placeholder="Eg. Jhon Doe"
              width="100%"
              value={answer.name}
              onChange={({ target }) => {
                mutateAnswer("name", target.value);
              }}
            />
            <Spacer y={0.5} />
            <Input
              label="Classification"
              placeholder="Eg. BCA 1"
              width="100%"
              value={answer.classification}
              onChange={({ target }) => {
                mutateAnswer("classification", target.value);
              }}
            />
            <Divider volume={2}>Questions</Divider>
            {quiz.questions.map((question) => (
              <Card key={question.id} style={{ marginBottom: "2vh" }}>
                <Description
                  title={`Q. ${question.id}`}
                  content={<Text h3>{question.title}</Text>}
                />
                <Spacer y />
                <Text b type="secondary">
                  Options :
                </Text>
                <Spacer y={0.5} />
                <Text h5>
                  <Code>A</Code> {question.options["1"]}
                </Text>
                <Text h5>
                  <Code>B</Code> {question.options["2"]}
                </Text>
                <Text h5>
                  <Code>C</Code> {question.options["3"]}
                </Text>
                <Text h5>
                  <Code>D</Code> {question.options["4"]}
                </Text>
                <Spacer y />
                <Text b type="secondary">
                  Your answer :
                </Text>
                <Spacer y={0.5} />
                <Select
                  placeholder="Your answer"
                  initialValue="1"
                  value={answer.answers[question.id]}
                  onChange={(value) => {
                    mutateAnswer(`answer-${question.id}`, value);
                  }}
                >
                  <Select.Option value="1">A</Select.Option>
                  <Select.Option value="2">B</Select.Option>
                  <Select.Option value="3">C</Select.Option>
                  <Select.Option value="4">D</Select.Option>
                </Select>
              </Card>
            ))}
            <Divider volume={2}>End</Divider>
            <Row align="middle" justify="center">
              <Button
                type="success"
                loading={isSubmitting}
                size="large"
                onClick={submit}
              >
                Submit
              </Button>
            </Row>
          </>
        )
      ) : (
        "Check back later."
      )}
    </>
  ) : (
    <>
      <Text type="error" h2>
        Quiz not found!
      </Text>
      <Text h3>This quiz is either not created or has been deleted.</Text>
    </>
  );
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
