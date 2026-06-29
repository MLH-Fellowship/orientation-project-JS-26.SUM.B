import React, { useState } from "react";
import { findSpellingErrors, loadChecker } from "./spellcheck";

function AddExperience({ onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });
  const [spellingErrors, setSpellingErrors] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSpellCheck = async () => {
    const checker = await loadChecker();
    const text = [formData.title, formData.company, formData.description].join(
      " "
    );
    setSpellingErrors(findSpellingErrors(text, checker));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        if (onBack) onBack();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2>Add New Experience</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Company:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="text"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="text"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Logo URL:</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
        <button type="button" onClick={handleSpellCheck}>
          Check Spelling
        </button>
      </form>
      {spellingErrors !== null &&
        (spellingErrors.length > 0 ? (
          <ul>
            {spellingErrors.map((error, index) => (
              <li key={index}>
                {error.before} → {error.after}
              </li>
            ))}
          </ul>
        ) : (
          <p>No spelling errors found</p>
        ))}
    </div>
  );
}

export default AddExperience;
