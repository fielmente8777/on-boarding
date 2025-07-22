import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const Policies = ({ formData, handleChange }) => {
  return (
    <div>
      {Object.keys(defaultFormData.policies).map((field, idx) => (
        <div key={idx} className="space-y-">
          <label className="font-semibold">{field}</label>
          <input
            type="text"
            value={formData.policies[field]}
            onChange={(e) => handleChange("policies", field, e.target.value)}
            className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
          />
        </div>
      ))}
    </div>
  );
};

export default Policies;
