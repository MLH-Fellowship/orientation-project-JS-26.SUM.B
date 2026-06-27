import React, { useState } from "react";

function UserInformation({ userInfo, onSave }) {
  const [isEditing, setIsEditing] = useState(!userInfo);
  const [formData, setFormData] = useState({
    name: userInfo?.name || "",
    phone: userInfo?.phone || "",
    email: userInfo?.email || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const method = userInfo ? "PUT" : "POST";
    fetch("/resume/user_information", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then(() => {
        setIsEditing(false);
        if (onSave) onSave(formData);
      })
      .catch((error) => console.error("Error:", error));
  };

  if (!isEditing) {
    return (
      <div className="userInfo">
        <h2>{formData.name}</h2>
        <p>{formData.email}</p>
        <p>{formData.phone}</p>
        <button onClick={() => setIsEditing(true)}>Edit Info</button>
      </div>
    );
  }

  return (
    <div className="userInfo">
      <h2>Your Information</h2>
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
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone (with country code):</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="+1 555 000 0000"
            value={formData.phone}
            onChange={handleChange}
            pattern="^\+[0-9\s\-]{7,20}$"
            title="Include international country code, e.g. +1 555 000 0000"
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default UserInformation;
