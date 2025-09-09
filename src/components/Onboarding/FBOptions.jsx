import React from "react";

const FBOptions = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      {formData.fbOptions.map((fb, idx) => (
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
            <h4>F&B Option {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem("fbOptions", idx)}
            >
              Delete
            </button>
          </div>
          <label>Restaurant Name</label>
          <input
            type="text"
            value={fb.name}
            onChange={(e) =>
              handleChange("fbOptions", idx, "name", e.target.value)
            }
          />
          <label>Cuisine</label>
          <input
            type="text"
            value={fb.cuisine}
            onChange={(e) =>
              handleChange("fbOptions", idx, "cuisine", e.target.value)
            }
          />
          <label>Type</label>
          <input
            type="text"
            value={fb.type}
            onChange={(e) =>
              handleChange("fbOptions", idx, "type", e.target.value)
            }
          />
          <label>Timings</label>
          <input
            type="text"
            value={fb.timings}
            onChange={(e) =>
              handleChange("fbOptions", idx, "timings", e.target.value)
            }
          />
          <label>Meals</label>
          <input
            type="text"
            value={fb.meals}
            onChange={(e) =>
              handleChange("fbOptions", idx, "meals", e.target.value)
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("fbOptions")}
      >
        + Add F&B Option
      </button>
    </div>
  );
};

export default FBOptions;
