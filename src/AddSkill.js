import React, { useState } from "react";

function AddSkill({ onBack }) {
  const [formData, setFormData] = useState({
    name: "",
    proficiency: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/skill", {
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
      <h2>Add New Skill</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="proficiency">Proficiency:</label>
          <input
            id="proficiency"
            type="text"
            name="proficiency"
            value={formData.proficiency}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="skill-logo">Logo URL:</label>
          <input
            id="skill-logo"
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
      </form>
    </div>
  );
}

export default AddSkill;
