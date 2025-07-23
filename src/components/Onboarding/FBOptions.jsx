import React from "react";

const FBOptions = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      <div className="space-y-6">
        {formData.fbOptions.map((fb, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-between items-center">
              <h4>F&B Option {idx + 1}</h4>

              {idx !== 0 && (
                <button
                  type="button"
                  className="size-6 rounded-full bg-red-500 text-white"
                  onClick={() => removeItem("fbOptions", idx)}
                >
                  X
                </button>
              )}
            </div>

            <div className="space-y-2">
              {" "}
              <label>Restaurant Name</label>
              <input
                type="text"
                value={fb.name}
                className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                onChange={(e) =>
                  handleChange("fbOptions", idx, "name", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Cuisine</label>
              <input
                type="text"
                value={fb.cuisine}
                className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                onChange={(e) =>
                  handleChange("fbOptions", idx, "cuisine", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Type</label>
              <input
                type="text"
                value={fb.type}
                className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                onChange={(e) =>
                  handleChange("fbOptions", idx, "type", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Timings</label>
              <input
                type="text"
                className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                value={fb.timings}
                onChange={(e) =>
                  handleChange("fbOptions", idx, "timings", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Meals</label>
              <input
                type="text"
                value={fb.meals}
                className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                onChange={(e) =>
                  handleChange("fbOptions", idx, "meals", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

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
