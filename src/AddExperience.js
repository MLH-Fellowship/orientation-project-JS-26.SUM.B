import React, { useState } from "react";

function AddExperience({ onBack }) {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    start_date: "",
    end_date: "",
    description: "",
    logo: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const readLogoFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, logo: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleLogoChange = (e) => {
    readLogoFile(e.target.files[0]);
  };

  const handleLogoDrop = (e) => {
    e.preventDefault();
    readLogoFile(e.dataTransfer.files[0]);
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
          <label>Logo:</label>
          <div
            className="logoDropZone"
            onDrop={handleLogoDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleLogoChange}
            />
            {formData.logo ? (
              <img src={formData.logo} alt="Logo preview" width="80" />
            ) : (
              <span>Drag and drop an image here, or choose a file</span>
            )}
          </div>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={onBack}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddExperience;
