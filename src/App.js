import React, { useState, useEffect } from "react";
import "./App.css";
import AddExperience from "./AddExperience";
import EditExperience from "./EditExperience";
import EditEducation from "./EditEducation";
import EditSkill from "./EditSkill";

function App() {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);

  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [skills, setSkills] = useState([]);

  const fetchData = () => {
    fetch("/resume/experience")
      .then((r) => r.json())
      .then(setExperiences)
      .catch(() => {});
    fetch("/resume/education")
      .then((r) => r.json())
      .then(setEducations)
      .catch(() => {});
    fetch("/resume/skill")
      .then((r) => r.json())
      .then(setSkills)
      .catch(() => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isAddingExperience) {
    return (
      <div className="App">
        <AddExperience
          onBack={() => {
            setIsAddingExperience(false);
            fetchData();
          }}
        />
      </div>
    );
  }

  if (editingExperience !== null) {
    return (
      <div className="App">
        <EditExperience
          experience={experiences[editingExperience]}
          index={editingExperience}
          onBack={() => {
            setEditingExperience(null);
            fetchData();
          }}
        />
      </div>
    );
  }

  if (editingEducation !== null) {
    return (
      <div className="App">
        <EditEducation
          education={educations[editingEducation]}
          index={editingEducation}
          onBack={() => {
            setEditingEducation(null);
            fetchData();
          }}
        />
      </div>
    );
  }

  if (editingSkill !== null) {
    return (
      <div className="App">
        <EditSkill
          skill={skills[editingSkill]}
          index={editingSkill}
          onBack={() => {
            setEditingSkill(null);
            fetchData();
          }}
        />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Resume Builder</h1>
      <div className="resumeSection">
        <h2>Experience</h2>
        {experiences.length === 0 ? (
          <p>No experience added yet.</p>
        ) : (
          experiences.map((exp, i) => (
            <div key={i}>
              <strong>{exp.title}</strong> at {exp.company}
              <button onClick={() => setEditingExperience(i)}>Edit</button>
            </div>
          ))
        )}
        <button onClick={() => setIsAddingExperience(true)}>
          Add Experience
        </button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Education</h2>
        {educations.length === 0 ? (
          <p>No education added yet.</p>
        ) : (
          educations.map((edu, i) => (
            <div key={i}>
              <strong>{edu.course}</strong> at {edu.school}
              <button onClick={() => setEditingEducation(i)}>Edit</button>
            </div>
          ))
        )}
        <button>Add Education</button>
        <br></br>
      </div>
      <div className="resumeSection">
        <h2>Skills</h2>
        {skills.length === 0 ? (
          <p>No skills added yet.</p>
        ) : (
          skills.map((skill, i) => (
            <div key={i}>
              <strong>{skill.name}</strong> — {skill.proficiency}
              <button onClick={() => setEditingSkill(i)}>Edit</button>
            </div>
          ))
        )}
        <button>Add Skill</button>
        <br></br>
      </div>
      <br></br>
      <button>Export</button>
    </div>
  );
}

export default App;
