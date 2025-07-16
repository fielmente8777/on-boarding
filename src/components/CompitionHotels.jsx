import React, { useState } from "react";
import { defaultFormData } from "../App";

const CompitionHotels = () => {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <div>
      {formData.competitionHotels.map((hotel, idx) => (
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
            <h4 style={{ margin: 0 }}>Hotel {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              //   onClick={() => removeItem("competitionHotels", idx)}
            >
              Delete
            </button>
          </div>
          <input
            type="text"
            value={hotel}
            onChange={(e) => {
              const updated = [...formData.competitionHotels];
              updated[idx] = e.target.value;
              setFormData((prev) => ({
                ...prev,
                competitionHotels: updated,
              }));
            }}
            placeholder="Hotel name"
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        // onClick={() =>
        // //   setFormData((prev) => ({
        // //     ...prev,
        // //     competitionHotels: [...prev.competitionHotels, ""],
        // //   }))
        // }
      >
        + Add Hotel
      </button>
    </div>
  );
};

export default CompitionHotels;
