import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const TouristInterest = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div className="space-y-5">
      {formData.touristInterest.map((place, idx) => (
        <div key={idx} className="">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Place {idx + 1}</h4>

            {idx !== 0 && (
              <button
                type="button"
                className="size-6 rounded-full bg-red-500 text-white"
                onClick={() => removeItem("touristInterest", idx)}
              >
                X
              </button>
            )}
          </div>

          <input
            type="text"
            value={place}
            className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
            onChange={(e) =>
              handleChange("touristInterest", idx, "", e.target.value)
            }
            // onChange={(e) => {
            //   const updated = [...formData.touristInterest];
            //   updated[idx] = e.target.value;
            //   setFormData((prev) => ({
            //     ...prev,
            //     touristInterest: updated,
            //   }));
            // }}
            placeholder="e.g., India Gate, Connaught Place"
          />
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("touristInterest")}
        // onClick={() =>
        //   setFormData((prev) => ({
        //     ...prev,
        //     touristInterest: [...prev.touristInterest, ""],
        //   }))
        // }
      >
        + Add Tourist Place
      </button>
    </div>
  );
};

export default TouristInterest;
