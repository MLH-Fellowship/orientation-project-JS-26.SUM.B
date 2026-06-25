import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context";
import Home from "./pages/Home";
import AddSkill from "./pages/AddSkill";
import EditSkill from "./pages/EditSkill";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/skill/new" element={<AddSkill />} />
            <Route path="/skill/:id/edit" element={<EditSkill />} />
          </Routes>
        </div>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
