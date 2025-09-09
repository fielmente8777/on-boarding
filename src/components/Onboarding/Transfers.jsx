import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const Transfers = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      {formData.transfers.map((t, idx) => (
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
            <h3>Transfer {idx + 1}</h3>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem("transfers", idx)}
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

          <label>Model</label>
          <input
            type="text"
            value={t.model}
            onChange={(e) =>
              handleChange("transfers", idx, "model", e.target.value)
            }
          />

          <label>Pickup</label>
          <input
            type="text"
            value={t.pickup}
            onChange={(e) =>
              handleChange("transfers", idx, "pickup", e.target.value)
            }
          />

          <label>Chargeable</label>
          <select
            value={t.chargeable}
            onChange={(e) =>
              handleChange("transfers", idx, "chargeable", e.target.value)
            }
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <label>One Way</label>
          <input
            type="text"
            value={t.oneWay}
            onChange={(e) =>
              handleChange("transfers", idx, "oneWay", e.target.value)
            }
          />

          <label>Two Way</label>
          <input
            type="text"
            value={t.twoWay}
            onChange={(e) =>
              handleChange("transfers", idx, "twoWay", e.target.value)
            }
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("transfers")}
      >
        + Add Transfer
      </button>
    </div>
  );
};

export default Transfers;
