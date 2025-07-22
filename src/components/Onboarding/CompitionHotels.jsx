import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const CompitionHotels = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div className="space-y-4">
      {formData.competitionHotels.map((hotel, idx) => (
        <div key={idx} className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold">Hotel {idx + 1}</h4>

            {idx !== 0 && (
              <button
                type="button"
                className="size-6 rounded-full bg-red-500 text-white"
                onClick={() => removeItem("competitionHotels", idx)}
              >
                X
              </button>
            )}
          </div>

          <input
            type="text"
            value={hotel}
            className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
            // onChange={(e) => {
            //   const updated = [...formData.competitionHotels];
            //   updated[idx] = e.target.value;
            //   setFormData((prev) => ({
            //     ...prev,
            //     competitionHotels: updated,
            //   }));
            // }}
            onChange={(e) =>
              handleChange("competitionHotels", idx, "", e.target.value)
            }
            placeholder="Hotel name"
          />
        </div>
      ))}

      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("competitionHotels", "")}
        // onClick={() =>
        // //   setFormData((prev) => ({
        // //     ...prev,
        // //     competitionHotels: [...prev.competitionHotels, ""],
        // //   }))
        // }
      >
        + Add Hotel
      </button>
    </div>
  );
};

export default CompitionHotels;
