import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home"
import InterviewUpdate from "./Components/InterviewUpdate"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/interviewupdate" element={<InterviewUpdate />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
