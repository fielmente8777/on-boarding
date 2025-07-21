import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const TouristInterest = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      {formData.touristInterest.map((place, idx) => (
        <div
          key={idx}
          className="form-group"
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h4 style={{ margin: 0 }}>Place {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem("touristInterest", idx)}
            >
              Delete
            </button>
          </div>
          <input
            type="text"
            value={place}
            onChange={(e) =>
              handleChange("touristInterest", idx, "", e.target.value)
            }
            // onChange={(e) => {
            //   const updated = [...formData.touristInterest];
            //   updated[idx] = e.target.value;
            //   setFormData((prev) => ({
            //     ...prev,
            //     touristInterest: updated,
            //   }));
            // }}
            placeholder="e.g., India Gate, Connaught Place"
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("touristInterest")}
        // onClick={() =>
        //   setFormData((prev) => ({
        //     ...prev,
        //     touristInterest: [...prev.touristInterest, ""],
        //   }))
        // }
      >
        + Add Tourist Place
      </button>
    </div>
  );
};

export default TouristInterest;
