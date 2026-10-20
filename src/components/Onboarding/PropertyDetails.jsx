import React from "react";
import { propertySections } from "../../constats/formInput";
import CountryCodePicker from "./CountryCodePicker";

const inputClass = (hasError) =>
  `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-800 shadow-sm outline-none transition placeholder:text-gray-400 focus:ring-2 ${
    hasError
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-gray-200 focus:border-[#0A3A75] focus:ring-[#0A3A75]/10"
  }`;

const PropertyDetails = ({
  formData,
  handleChange,
  errors = {},
  autofilled = new Set(),
}) => {
  const values = formData.propertyDetails || {};

  const renderField = (field) => {
    const value = values[field.key] ?? "";
    const error = errors[field.key];
    const onChange = (e) =>
      handleChange("propertyDetails", field.key, e.target.value);

    let control;
    if (field.type === "textarea") {
      control = (
        <textarea
          id={field.key}
          rows={4}
          value={value}
          placeholder={field.placeholder}
          onChange={onChange}
          className={inputClass(error)}
        />
      );
    } else if (field.key === "hotelPhone") {
      control = (
        <div className="flex gap-2">
          <CountryCodePicker
            code={values.hotelPhoneCode}
            iso3={values.hotelPhoneIso}
            onChange={(c) => {
              handleChange("propertyDetails", "hotelPhoneCode", c.code);
              handleChange("propertyDetails", "hotelPhoneIso", c.iso3);
            }}
          />
          <input
            id={field.key}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={value}
            placeholder={field.placeholder}
            onChange={(e) =>
              handleChange(
                "propertyDetails",
                field.key,
                e.target.value.replace(/[^\d ]/g, ""),
              )
            }
            className={inputClass(error)}
          />
        </div>
      );
    } else if (field.type === "select") {
      control = (
        <select
          id={field.key}
          value={value}
          onChange={onChange}
          className={inputClass(error)}
        >
          <option value="">Select</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>
              {field.optionLabel ? field.optionLabel(opt) : opt}
            </option>
          ))}
        </select>
      );
    } else {
      control = (
        <input
          id={field.key}
          type={field.type}
          step={field.step}
          value={value}
          placeholder={field.placeholder}
          onChange={onChange}
          className={inputClass(error)}
        />
      );
    }

    return (
      <div
        key={field.key}
        className={`flex flex-col gap-1.5 ${field.full ? "md:col-span-2" : ""}`}
      >
        <label
          htmlFor={field.key}
          className="text-sm font-medium text-gray-700"
        >
          {field.label}
          {field.required && <span className="ml-0.5 text-[#fc5f07]">*</span>}
          {autofilled.has(field.key) && (
            <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-700">
              From Google
            </span>
          )}
        </label>
        {control}
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {propertySections.map((section) => (
        <section
          key={section.title}
          id={`section-${section.title}`}
          className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm md:p-7"
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-[#0A3A75]">
                {section.title}
              </h3>
              {section.description && (
                <p className="mt-0.5 text-sm text-gray-500">
                  {section.description}
                </p>
              )}
            </div>
            {section.optional && (
              <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                Optional
              </span>
            )}
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {section.fields.map(renderField)}
          </div>
        </section>
      ))}
    </div>
  );
};

export default PropertyDetails;
