import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "./components/ui/Loader";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout";

const Quiz = lazy(() => import("./pages/Quiz"));
const NewQuiz = lazy(() => import("./pages/New"));
const SingleQuiz = lazy(() => import("./pages/QuizID"));
const EditQuiz = lazy(() => import("./pages/EditQuiz"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="quiz" />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="quiz/:quizID" element={<SingleQuiz />} />
          <Route path="quiz/:quizID/edit" element={<EditQuiz />} />
          <Route path="quiz/new" element={<NewQuiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Suspense>
  );
}
