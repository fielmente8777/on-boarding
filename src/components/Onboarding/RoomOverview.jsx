import React, { useState } from "react";
import { defaultFormData } from "../../constats/formData";

const RoomOverview = ({ formData, handleChange }) => {
  return (
    <div>
      {formData.rooms.map((room, idx) => (
        <div
          key={idx}
          className="room-entry"
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
            <h3>Room {idx + 1}</h3>
            <button
              type="button"
              className="delete-btn"
              //   onClick={() => removeItem("rooms", idx)}
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
          {Object.keys(room).map((field, fidx) => (
            <div key={fidx} className="form-group">
              <label>{field}</label>
              <input
                type="text"
                value={room[field]}
                onChange={(e) =>
                  handleChange("rooms", idx, field, e.target.value)
                }
              />
            </div>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        // onClick={() => addItem("rooms")}
      >
        + Add Room
      </button>
    </div>
  );
};

export default RoomOverview;
