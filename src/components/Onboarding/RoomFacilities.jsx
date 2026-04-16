import React from "react";

const RoomFacilities = ({ formData, handleChange }) => {
  return (
    <div>
      {formData.roomFacilities.map((facility, idx) => (
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
            <h4>Facility {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              //   onClick={() => removeItem("roomFacilities", idx)}
            >
              Delete
            </button>
          </div>
          <label>Facility</label>
          <input
            type="text"
            value={facility.name}
            onChange={(e) =>
              handleChange("roomFacilities", idx, "name", e.target.value)
            }
          />
          <label>Availability</label>
          <select
            value={facility.available}
            onChange={(e) =>
              handleChange("roomFacilities", idx, "available", e.target.value)
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          <label>Complimentary</label>
          <select
            value={facility.complimentary}
            onChange={(e) =>
              handleChange(
                "roomFacilities",
                idx,
                "complimentary",
                e.target.value
              )
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        // onClick={() => addItem("roomFacilities")}
      >
        + Add Facility
      </button>
    </div>
  );
};

export default RoomFacilities;
