import React, { useState } from "react";

function AddEducation({ onBack }) {
  const [formData, setFormData] = useState({
    course: "",
    school: "",
    start_date: "",
    end_date: "",
    grade: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/resume/education", {
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
      <h2>Add New Education</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Course:</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>School:</label>
          <input
            type="text"
            name="school"
            value={formData.school}
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
          <label>Grade:</label>
          <input
            type="text"
            name="grade"
            value={formData.grade}
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
      </form>
    </div>
  );
}

export default AddEducation;
