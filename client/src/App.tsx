import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoginPage } from "./views/LoginPage";
import { NotFoundPage } from "./views/NotFoundPage";
import { HomePage } from "./views/HomePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;
