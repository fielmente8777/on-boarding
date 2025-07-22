import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const Transfers = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      <div className="space-y-6">
        {formData.transfers.map((t, idx) => (
          <div key={idx} className="space-y-4">
            <div className="flex justify-between upi-container">
              <h3 className="font-semibold">Transfer {idx + 1}</h3>

              {idx !== 0 && (
                <button
                  type="button"
                  className="size-6 rounded-full bg-red-500 text-white"
                  onClick={() => removeItem("transfers", idx)}
                >
                  X
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label>Model</label>
              <input
                type="text"
                value={t.model}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("transfers", idx, "model", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Pickup</label>
              <input
                type="text"
                value={t.pickup}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("transfers", idx, "pickup", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Chargeable</label>
              <select
                value={t.chargeable}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("transfers", idx, "chargeable", e.target.value)
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="space-y-2">
              <label>One Way</label>
              <input
                type="text"
                value={t.oneWay}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("transfers", idx, "oneWay", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <label>Two Way</label>
              <input
                type="text"
                value={t.twoWay}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("transfers", idx, "twoWay", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>

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
