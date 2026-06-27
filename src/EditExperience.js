import React, { useState } from "react";

function EditExperience({ experience, index, onBack }) {
  const [formData, setFormData] = useState({
    title: experience.title || "",
    company: experience.company || "",
    start_date: experience.start_date || "",
    end_date: experience.end_date || "",
    description: experience.description || "",
    logo: experience.logo || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/resume/experience/${index}`, {
      method: "PUT",
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
      <h2>Edit Experience</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="company">Company:</label>
          <input
            id="company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="start_date">Start Date:</label>
          <input
            id="start_date"
            type="text"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end_date">End Date:</label>
          <input
            id="end_date"
            type="text"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="logo">Logo URL:</label>
          <input
            id="logo"
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditExperience;
