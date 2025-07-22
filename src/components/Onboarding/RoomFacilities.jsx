import React from "react";

const RoomFacilities = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div className="space-y-6">
      {formData.roomFacilities.map((facility, idx) => (
        <div key={idx} className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Facility {idx + 1}</h4>

            {idx !== 0 && (
              <button
                type="button"
                className="size-6 rounded-full bg-red-500 text-white"
                onClick={() => removeItem("roomFacilities", idx)}
              >
                X
              </button>
            )}
          </div>

          <div className="space-y-2">
            <label className="font-medium">Facility</label>
            <input
              type="text"
              value={facility.name}
              className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
              onChange={(e) =>
                handleChange("roomFacilities", idx, "name", e.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <label className="font-medium">Availability</label>
            <select
              value={facility.available}
              className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
              onChange={(e) =>
                handleChange("roomFacilities", idx, "available", e.target.value)
              }
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-medium">Complimentary</label>
            <select
              value={facility.complimentary}
              className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
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
        </div>
      ))}
      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("roomFacilities")}
      >
        + Add Facility
      </button>
    </div>
  );
};

export default RoomFacilities;
