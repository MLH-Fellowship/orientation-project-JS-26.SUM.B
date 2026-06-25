import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ResumeProvider } from "./context";
import Home from "./pages/Home";
import AddExperience from "./pages/AddExperience";
import EditExperience from "./pages/EditExperience";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ResumeProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience/new" element={<AddExperience />} />
            <Route path="/experience/:id/edit" element={<EditExperience />} />
          </Routes>
        </div>
      </ResumeProvider>
    </BrowserRouter>
  );
}

export default App;
