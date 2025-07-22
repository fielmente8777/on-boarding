import React, { useState } from "react";
import { defaultFormData } from "../../constants/formData";

const ImportantContacts = ({ formData, handleChange, addItem, removeItem }) => {
  return (
    <div>
      <div className="space-y-6">
        {formData.importantContacts.map((contact, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Contact {idx + 1}</h3>

              {idx !== 0 && (
                <button
                  type="button"
                  className="size-6 rounded-full bg-red-500 text-white"
                  onClick={() => removeItem("importantContacts", idx)}
                >
                  X
                </button>
              )}
            </div>

            <div>
              <label>Name</label>

              <input
                type="text"
                value={contact.name}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange("importantContacts", idx, "name", e.target.value)
                }
              />
            </div>

            <div>
              <label>Phone</label>

              <input
                type="text"
                value={contact.phone}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange(
                    "importantContacts",
                    idx,
                    "phone",
                    e.target.value
                  )
                }
              />
            </div>

            <div>
              <label>Email</label>

              <input
                type="email"
                value={contact.email}
                className="col-span-full w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm mt-2"
                onChange={(e) =>
                  handleChange(
                    "importantContacts",
                    idx,
                    "email",
                    e.target.value
                  )
                }
              />
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="add-btn"
        onClick={() => addItem("importantContacts")}
      >
        + Add Contact
      </button>
    </div>
  );
};

export default ImportantContacts;
