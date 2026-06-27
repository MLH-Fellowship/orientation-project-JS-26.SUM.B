import React, { useState } from "react";

function EditEducation({ education, index, onBack }) {
  const [formData, setFormData] = useState({
    course: education.course || "",
    school: education.school || "",
    start_date: education.start_date || "",
    end_date: education.end_date || "",
    grade: education.grade || "",
    logo: education.logo || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/resume/education/${index}`, {
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
      <h2>Edit Education</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="course">Course:</label>
          <input
            id="course"
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="school">School:</label>
          <input
            id="school"
            type="text"
            name="school"
            value={formData.school}
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
          <label htmlFor="grade">Grade:</label>
          <input
            id="grade"
            type="text"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="edu-logo">Logo URL:</label>
          <input
            id="edu-logo"
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

export default EditEducation;
