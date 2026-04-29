import React from "react";
import { propertyFields } from "../../constats/formInput";

const PropertyDetails = ({ formData, handleChange }) => {
  return (
    <div className="p-6 md:p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-100">
      
      {/* Header */}
      {/* <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Property Details
        </h2>
        <p className="text-gray-500 mt-1 text-sm">
          Fill in the details about your property
        </p>
      </div> */}

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {propertyFields.map((field, idx) => {
          if (field.group) {
            return (
              <div key={idx} className="col-span-1 md:col-span-2 mt-4">
                <h3 className="text-lg font-semibold text-gray-700 border-l-4 border-blue-500 pl-3">
                  {field.group}
                </h3>
              </div>
            );
          }

          const value = formData.propertyDetails[field.key] || "";

          return (
            <div key={idx} className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-600">
                {field.label}
              </label>

              {/* TEXTAREA */}
              {field.type === "textarea" ? (
                <textarea
                  rows={4}
                  value={value}
                  onChange={(e) =>
                    handleChange("propertyDetails", field.key, e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                />
              ) : field.type === "select" ? (
                /* SELECT */
                <select
                  value={value}
                  onChange={(e) =>
                    handleChange("propertyDetails", field.key, e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
                >
                  <option value="">Select</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {field.key === "starCategory" ? `${opt} Star` : opt}
                    </option>
                  ))}
                </select>
              ) : (
                /* INPUT */
                <input
                  type={field.type}
                  step={field.step || undefined}
                  value={value}
                  minLength={field.minLength}
                  maxLength={field.maxLength}
                  onChange={(e) =>
                    handleChange("propertyDetails", field.key, e.target.value)
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm shadow-sm 
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
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