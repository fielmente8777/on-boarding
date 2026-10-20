// Field keys must match what the backends read:
// gian /api/v1/onboarding (propertyDetails.*) and nexon /eazotel/createwebsite.
export const propertySections = [
  {
    title: "Basic Information",
    description: "This appears on your website and booking engine.",
    fields: [
      { key: "hotelName", label: "Hotel Name", type: "text", required: true, placeholder: "e.g. The Grand Palace" },
      {
        key: "accommodationType",
        label: "Type of Accommodation",
        type: "select",
        options: ["Hotel", "Resort", "Homestay", "Villa", "Hostel", "Guest House", "Boutique Hotel"],
      },
      {
        key: "starCategory",
        label: "Star Category",
        type: "select",
        options: ["1", "2", "3", "4", "5"],
        optionLabel: (opt) => `${opt} Star`,
      },
      {
        key: "currency",
        label: "Currency",
        type: "select",
        required: true,
        options: ["INR", "USD", "EUR", "GBP", "AED"],
      },
      { key: "hotelDescription", label: "Hotel Description", type: "textarea", full: true, placeholder: "Tell guests what makes your property special" },
    ],
  },
  {
    title: "Contact Details",
    description: "Guests and our team will use these to reach you.",
    fields: [
      { key: "hotelEmail", label: "Hotel Email", type: "email", required: true, placeholder: "reservations@hotel.com" },
      { key: "hotelPhone", label: "Hotel Phone", type: "tel", required: true, placeholder: "98765 43210" },
      { key: "hotelWebsite", label: "Current Website (if any)", type: "url", placeholder: "https://", full: true },
    ],
  },
  {
    title: "Location",
    fields: [
      { key: "address", label: "Address", type: "text", required: true, full: true },
      { key: "locality", label: "Locality", type: "text" },
      { key: "city", label: "City", type: "text", required: true },
      { key: "state", label: "State", type: "text", required: true },
      { key: "country", label: "Country", type: "text", required: true },
      { key: "pinCode", label: "PIN / ZIP Code", type: "text", required: true },
    ],
  },
];

export const requiredPropertyFields = propertySections
  .flatMap((s) => s.fields)
  .filter((f) => f.required);
