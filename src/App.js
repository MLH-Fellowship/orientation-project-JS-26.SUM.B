import React, { useState } from "react";
import "./App.css";
import AddEducation from "./AddEducation";
import AddExperience from "./AddExperience";

function App() {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [isAddingExperience, setIsAddingExperience] = useState(false);

  if (isAddingEducation) {
    return (
      <div className="App">
        <AddEducation onBack={() => setIsAddingEducation(false)} />
      </div>
    );
  }

  if (isAddingExperience) {
    return (
      <div className="App">
        <AddExperience onBack={() => setIsAddingExperience(false)} />
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
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
