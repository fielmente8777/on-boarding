import React from "react";

const RatePlans = ({ formData, handleChange }) => {
  return (
    <div>
      {formData.ratePlans.map((plan, idx) => (
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
            <h4>Rate Plan {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              //   onClick={() => removeItem("ratePlans", idx)}
            >
              Delete
            </button>
          </div>
          {Object.keys(plan).map((field, fidx) => (
            <React.Fragment key={fidx}>
              <label>{field}</label>
              <input
                type="text"
                value={plan[field]}
                onChange={(e) =>
                  handleChange("ratePlans", idx, field, e.target.value)
                }
              />
            </React.Fragment>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        // onClick={() => addItem("ratePlans")}
      >
        + Add Rate Plan
      </button>
    </div>
  );
};

export default RatePlans;
