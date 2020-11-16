import { useRouter } from "next/router";
import { useState } from "react";
import { getSession, useSession } from "next-auth/client";
import {
  Button,
  Card,
  Input,
  Select,
  Spacer,
  Text,
  Row,
  Code,
  useToasts,
  Badge,
  Divider,
} from "@geist-ui/react";
import { Plus, Save, X } from "@geist-ui/react-icons";

export default function NewTest() {
  const [session] = useSession();
  const router = useRouter();

  const [isSaveInProgress, setIsSaveInProgress] = useState(false);
  const [, setToasts] = useToasts();
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      answer: "1",
    },
  ]);

  const validateTitle = () => {
    if (title.length >= 1) {
      return true;
    } else {
      setToasts({ text: "Please specify a title", type: "error" });
    }
  };
  const validateQuestions = () => {
    let toReturn = true;
    questions.map((question) => {
      let questionValues = Object.values(question);
      if (questionValues.length !== questionValues.filter(Boolean).length) {
        console.log(questionValues);
        setToasts({
          text: `Check for empty fields in question ${question.id}`,
          type: "error",
        });
        toReturn = false;
        return;
      }
    });
    return toReturn;
  };

  const save = async () => {
    if (validateTitle() && validateQuestions()) {
      setIsSaveInProgress(true);
      await fetch("/api/quiz/create", {
        method: "POST",
        body: JSON.stringify({
          userId: session.user.id,
          title: title,
          questions: questions,
        }),
      })
        .then(async () => {
          setToasts({
            text: "Quiz successfully created! Redirecting...",
            type: "success",
          });
          await router.push("/");
        })
        .catch((e) => {
          setToasts({
            text: `An unexpected error happened! Code: DB-C-Q-1(${e})`,
            type: "error",
          });
        })
        .finally(() => {
          setIsSaveInProgress(false);
        });
    }
  };

  const addInitialQuestion = () => {
    setQuestions((questions) => {
      const id = questions[questions.length - 1]?.id;
      return [
        ...questions,
        {
          id: id ? id + 1 : 1,
          title: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          answer: "1",
        },
      ];
    });
  };
  const deleteQuestion = (id) => {
    if (questions.length === 1) {
      setToasts({
        text: "There should be at least 1 question",
        type: "warning",
      });
      return;
    }
    setQuestions((questions) => {
      let toReturn = questions.filter((question) => {
        return question.id !== id;
      });
      for (var i = 1; i < toReturn.length + 1; i++) {
        toReturn[i - 1].id = i;
      }
      return toReturn;
    });
  };
  const updateQuestion = (id, field, value) => {
    setQuestions((questions) => {
      return questions.map((question) => {
        if (question.id === id) {
          return {
            ...question,
            [field]: value,
          };
        }
        return question;
      });
    });
  };

  return (
    <>
      <Input
        label="Title"
        size="large"
        width="100%"
        placeholder="Eg. BCA IT Test 2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Spacer y={0.5} />
      <Row align="middle" justify="space-between">
        <Badge.Anchor>
          <Badge>{questions.length}</Badge>
          <Button auto icon={<Plus />} onClick={addInitialQuestion}>
            Add Question
          </Button>
        </Badge.Anchor>
        <Button
          auto
          type="success"
          icon={<Save />}
          onClick={save}
          loading={isSaveInProgress}
        >
          Save
        </Button>
      </Row>
      <Divider />
      {questions.map((que) => (
        <Card key={que.id} style={{ marginBottom: "2vh" }}>
          <Row align="middle" justify="space-between">
            <Text b>
              Question <Code>{que.id}</Code>
            </Text>
            <Button
              auto
              size="mini"
              type="error"
              icon={<X />}
              onClick={() => deleteQuestion(que.id)}
            />
          </Row>
          <Spacer y />
          <Input
            label="Title"
            width="100%"
            placeholder="Eg. What is '10' in binary?"
            value={que.title}
            onChange={(e) => updateQuestion(que.id, "title", e.target.value)}
          />
          <Spacer y />
          Options:
          <Spacer y={0.5} />
          <Input
            label="1"
            placeholder="Eg. 1010"
            value={que.option1}
            onChange={(e) => updateQuestion(que.id, "option1", e.target.value)}
          />
          <Spacer y={0.5} />
          <Input
            label="2"
            placeholder="Eg. 1110"
            value={que.option2}
            onChange={(e) => updateQuestion(que.id, "option2", e.target.value)}
          />
          <Spacer y={0.5} />
          <Input
            label="3"
            placeholder="Eg. 1011"
            value={que.option3}
            onChange={(e) => updateQuestion(que.id, "option3", e.target.value)}
          />
          <Spacer y={0.5} />
          <Input
            label="4"
            placeholder="Eg. 0101"
            value={que.option4}
            onChange={(e) => updateQuestion(que.id, "option4", e.target.value)}
          />
          <Spacer y />
          Select Correct Answer:
          <Spacer y={0.5} />
          <Select
            initialValue="1"
            value={que.answer}
            onChange={(val) => updateQuestion(que.id, "answer", val)}
          >
            <Select.Option value="1">1</Select.Option>
            <Select.Option value="2">2</Select.Option>
            <Select.Option value="3">3</Select.Option>
            <Select.Option value="4">4</Select.Option>
          </Select>
        </Card>
      ))}
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
