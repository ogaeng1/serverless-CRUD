import { Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import BoardDetail from "./components/BoardDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthComponent />} />
      <Route path="/board/:id" element={<BoardDetail />} />
    </Routes>
  )
}

export default App;