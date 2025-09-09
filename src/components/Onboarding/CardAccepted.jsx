import React from "react";

const CardAccepted = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      {formData.cardsAccepted.map((card, idx) => (
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
              marginBottom: "0.75rem",
            }}
          >
            <h4 style={{ margin: 0 }}>Card {idx + 1}</h4>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem("cardsAccepted", idx)}
            >
              Delete
            </button>
          </div>

          <div className="form-group horizontal">
            <label>Card Type</label>
            <input
              type="text"
              value={card.cardType}
              onChange={(e) =>
                handleChange("cardsAccepted", idx, "cardType", e.target.value)
              }
            />

            <label>Accepted</label>
            <select
              value={card.accepted}
              onChange={(e) =>
                handleChange("cardsAccepted", idx, "accepted", e.target.value)
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("cardsAccepted")}
      >
        + Add Card
      </button>
    </div>
  );
};

export default CardAccepted;
