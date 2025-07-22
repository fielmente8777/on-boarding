import React, { useState } from "react";
import { propertyFields } from "../../constants/formInput";
import { defaultFormData } from "../../constants/formData";

const PropertyDetails = ({ formData, handleChange }) => {
  return (
    <div className="bg-white">
      {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Property Details
      </h2> */}

      <div className="grid grid-cols-2 gap-6">
        {propertyFields.map((field, idx) => {
          if (field.group) {
            return (
              <div key={idx} className="col-span-2">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {field.group}
                </h3>
              </div>
            );
          }

          const value = formData.propertyDetails[field.key] || "";

          return (
            <div
              key={idx}
              className={`flex flex-col gap-1 ${
                field.type === "textarea" ? "col-span-full" : ""
              }`}
            >
              <label className="text-gray-700 font-medium">{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  rows={6}
                  value={value}
                  //   onChange={(e) =>
                  //     handleChange("propertyDetails", field.key, e.target.value)
                  //   }
                  className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                />
              ) : field.type === "select" ? (
                <select
                  value={value}
                  //   onChange={(e) =>
                  //     handleChange("propertyDetails", field.key, e.target.value)
                  //   }
                  className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                >
                  <option value="">Select</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt} Star
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  step={field.step || undefined}
                  value={value}
                  onChange={(e) =>
                    handleChange("propertyDetails", field.key, e.target.value)
                  }
                  className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyDetails;
