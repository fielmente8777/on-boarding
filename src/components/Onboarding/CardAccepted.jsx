import React from "react";

const CardAccepted = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div className="space-y-4">
      {formData.cardsAccepted.map((card, idx) => (
        <div key={idx} className="">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Card {idx + 1}</h4>

            {idx !== 0 && (
              <button
                type="button"
                className="size-6 rounded-full bg-red-500 text-white"
                onClick={() => removeItem("cardsAccepted", idx)}
              >
                X
              </button>
            )}
          </div>

          <div className="mt-4">
            <div className="space-y-2">
              <label className="font-medium">Card Type</label>
              <input
                type="text"
                value={card.cardType}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("cardsAccepted", idx, "cardType", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label className="font-medium">Accepted</label>
              <select
                value={card.accepted}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("cardsAccepted", idx, "accepted", e.target.value)
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
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
