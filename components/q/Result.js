import { Button, Row, Spacer, Table } from '@geist-ui/react'

export default function Result({ quiz }) {
  let rank = 1;
  let data = quiz.candidates.map((candidate) => {
    let score = 0;
    Object.keys(candidate.answers).map((questionNumber) => {
      if (quiz.questions.find((question) => question.id === Number(questionNumber) ).answer === candidate.answers[questionNumber]) {
        score = score + 1
      }
    })
    return { name: candidate.name, email: candidate.email, class: candidate.classification, score: String(score) }
  }).sort((a, b) => Number(b.score) - Number(a.score)).map((candidate) => {
    let toReturn = {...candidate, rank: rank }
    rank = rank + 1
    return toReturn
  })

  return (
    <>
    <div style={{ overflowY: 'auto' }}>
    <Table data={data}>
      <Table.Column prop="rank" label="Rank" />
      <Table.Column prop="name" label="Name" />
      <Table.Column prop="score" label="Score" /> 
      <Table.Column prop="class" label="Classification" />
      <Table.Column prop="email" label="Email" />
    </Table>
    </div>
    </>
  )
}