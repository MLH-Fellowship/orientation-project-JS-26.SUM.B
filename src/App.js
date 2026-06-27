import React, { useState } from "react";
import "./App.css";
import AddExperience from "./AddExperience";
import AddEducation from "./AddEducation";
import AddSkill from "./AddSkill";

function App() {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);

  if (isAddingExperience) {
    return (
      <div className="App">
        <AddExperience onBack={() => setIsAddingExperience(false)} />
      </div>
    );
  }

  if (isAddingEducation) {
    return (
      <div className="App">
        <AddEducation onBack={() => setIsAddingEducation(false)} />
      </div>
    );
  }

  if (isAddingSkill) {
    return (
      <div className="App">
        <AddSkill onBack={() => setIsAddingSkill(false)} />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        <p>Experience Placeholder</p>
        <button onClick={() => setIsAddingExperience(true)}>
          Add Experience
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        <p>Education Placeholder</p>
        <button onClick={() => setIsAddingEducation(true)}>
          Add Education
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        <p>Skill Placeholder</p>
        <button onClick={() => setIsAddingSkill(true)}>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
