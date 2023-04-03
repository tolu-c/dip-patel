import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Loader from "./components/ui/Loader";
import NotFound from "./pages/NotFound";

const Quiz = lazy(() => import("./pages/Quiz"));
const NewQuiz = lazy(() => import("./pages/New"));
const SingleQuiz = lazy(() => import("./pages/QuizID"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="quiz" />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="quiz/:quizID" element={<SingleQuiz />} />
        <Route path="quiz/new" element={<NewQuiz />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </Suspense>
  );
}
