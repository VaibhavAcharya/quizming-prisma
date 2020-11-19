export default function getBaseURL() {
  return process.env.NODE_ENV === "production"
    ? "https://quizming.vercel.app"
    : "http://localhost:3000";
}
