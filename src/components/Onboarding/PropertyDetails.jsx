import React, { useState } from "react";
import { propertyFields } from "../../constants/formInput";
import { defaultFormData } from "../../constants/formData";

const PropertyDetails = ({ formData, handleChange }) => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Property Details
      </h2>

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
            <div key={idx} className="flex flex-col space-y-2">
              <label className="text-gray-700 font-medium">{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={value}
                  //   onChange={(e) =>
                  //     handleChange("propertyDetails", field.key, e.target.value)
                  //   }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              ) : field.type === "select" ? (
                <select
                  value={value}
                  //   onChange={(e) =>
                  //     handleChange("propertyDetails", field.key, e.target.value)
                  //   }
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
                  className="border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
