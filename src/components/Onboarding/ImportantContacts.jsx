import React, { useState } from "react";
import { defaultFormData } from "../../constats/formData";

const ImportantContacts = ({ formData, handleChange }) => {
  return (
    <div>
      {formData.importantContacts.map((contact, idx) => (
        <div
          key={idx}
          className="form-group"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3>Contact {idx + 1}</h3>
            <button
              type="button"
              className="delete-btn"
              //   onClick={() => removeItem("importantContacts", idx)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
          <label>Name</label>
          <input
            type="text"
            value={contact.name}
            onChange={(e) =>
              handleChange("importantContacts", idx, "name", e.target.value)
            }
          />
          <label>Phone</label>
          <input
            type="text"
            value={contact.phone}
            onChange={(e) =>
              handleChange("importantContacts", idx, "phone", e.target.value)
            }
          />
          <label>Email</label>
          <input
            type="email"
            value={contact.email}
            onChange={(e) =>
              handleChange("importantContacts", idx, "email", e.target.value)
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        // onClick={() => addItem("importantContacts")}
      >
        + Add Contact
      </button>
    </div>
  );
};

export default ImportantContacts;
