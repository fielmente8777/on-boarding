import React from "react";

const RatePlans = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      <div className="space-y-6">
        {formData.ratePlans.map((plan, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Rate Plan {idx + 1}</h4>

              {idx !== 0 && (
                <button
                  type="button"
                  className="size-6 rounded-full bg-red-500 text-white"
                  onClick={() => removeItem("ratePlans", idx)}
                >
                  X
                </button>
              )}
            </div>

            {Object.keys(plan).map((field, fidx) => (
              <div key={fidx} className="space-y-2">
                <label>{field}</label>
                <input
                  type="text"
                  value={plan[field]}
                  className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                  onChange={(e) =>
                    handleChange("ratePlans", idx, field, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("ratePlans")}
      >
        + Add Rate Plan
      </button>
    </div>
  );
};

export default RatePlans;
