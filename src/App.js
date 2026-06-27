import React, { useState, useEffect } from "react";
import "./App.css";
import AddExperience from "./AddExperience";
import UserInformation from "./UserInformation";

function App() {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    fetch("/resume/user_information")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.name) setUserInfo(data);
      })
      .catch(() => {});
  }, []);

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
      <UserInformation
        userInfo={userInfo}
        onSave={(data) => setUserInfo(data)}
      />
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
        <button>Add Education</button>
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
