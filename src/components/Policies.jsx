import React, { useState } from "react";
import { defaultFormData } from "../App";

const Policies = () => {
  const [formData, setFormData] = useState(defaultFormData);

  return (
    <div>
      {Object.keys(defaultFormData.policies).map((field, idx) => (
        <div key={idx} className="form-group">
          <label>{field}</label>
          <input
            type="text"
            value={formData.policies[field]}
            // onChange={(e) => handleChange("policies", field, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
};

export default Policies;
