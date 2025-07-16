import React, { useState, useEffect } from "react";
import "./App.css";
import { propertyFields } from "./PropertyFields";
import PropertyDetails from "./components/PropertyDetails";
import Amenities from "./components/Amenities";
import Policies from "./components/Policies";
import RoomOverview from "./components/RoomOverview";
import CompitionHotels from "./components/CompitionHotels";
import ImportantContacts from "./components/ImportantContacts";
import Transfers from "./components/Transfers";
import TouristInterest from "./components/TouristInterest";

export const defaultFormData = {
  propertyDetails: {
    "Hotel Name": "",
    Address: "",
    "Locality & Pincode": "",
    "Distance from International Airport": "",
    "Distance from Domestic Airport": "",
    "Distance from Railway Station": "",
    "Hotel Website": "",
    "Year Built": "",
    "Recent Renovation Year": "",
    Latitude: "",
    Longitude: "",
    "Star Category": "",
    "Nearest Public Transport & Distance from hotel": "",
    "Type of Accomodation": "",
    "Hotel Description": "",
  },
  amenities: {},
  policies: {
    "24 hrs Check-In": "No",
    "24 hrs Check-Out": "No",
    "Standard Check-In Time": "",
    "Standard Check-Out Time": "",
    "Early Check-In": "",
    "Late Check-Out": "",
    "Visitors Allowed": "",
    "Pets Allowed": "",
    "Children allowed in hotel": "",
    "Complimentary stay for children until age of 6": "",
    "Extra bed required from age of": "",
    "Minimum age of Check-in": "",
    "Alcohol allowed onsite": "",
    "Alcohol Served onsite": "",
    "Stag/ bachelor and hen/ bachelorette parties": "",
    "Extra bed Charges (Adult)": "",
    "Extra bed Charges (Child)": "",
    "Cancellation Policy": "",
  },
  rooms: [
    {
      "Room Name": "",
      "Room Type": "",
      "Maximum Occupancy": "",
      "Total Inventory": "",
      "Area size (sq.ft)": "",
      "Bed Type": "",
      "Connecting/Adjoining Rooms": "",
      Balcony: "",
      Windows: "",
      "Room View": "",
    },
  ],
  competitionHotels: [""],
  importantContacts: [{ name: "", phone: "", email: "" }],
  transfers: [
    { model: "", pickup: "", chargeable: "No", oneWay: "", twoWay: "" },
  ],
  touristInterest: [""],
  cardsAccepted: [{ cardType: "", accepted: "No" }],
  roomFacilities: [{ name: "", available: "No", complimentary: "No" }],
  ratePlans: [
    {
      "Rate Plan Name": "",
      "Rate Plan Type": "",
      "Linked Plan": "",
      "Linked to": "",
      "Sgl Rate": "",
      "Dbl Rate": "",
      "Rooms Applicable": "",
      Inclusions: "",
      "Minimum length of stay": "",
      "Maximum length of stay": "",
      "Lead Time": "",
      "Cancellation Policy": "",
      "Members only deal": "",
    },
  ],
  fbOptions: [{ name: "", cuisine: "", type: "", timings: "", meals: "" }],
};

const steps = [
  { key: "propertyDetails", label: "Property Details", isDisabled: false },
  { key: "amenities", label: "Amenities", isDisabled: true },
  { key: "policies", label: "Policies", isDisabled: true },
  { key: "rooms", label: "Room Overview", isDisabled: true },
  { key: "competitionHotels", label: "Competition Hotels", isDisabled: true },
  { key: "importantContacts", label: "Important Contacts", isDisabled: true },
  { key: "transfers", label: "Transfers", isDisabled: true },
  { key: "touristInterest", label: "Tourist Interest", isDisabled: true },
  { key: "cardsAccepted", label: "Cards Accepted", isDisabled: true },
  { key: "roomFacilities", label: "Room Facilities", isDisabled: true },
  { key: "ratePlans", label: "Rate Plans", isDisabled: true },
  { key: "fbOptions", label: "F&B Options", isDisabled: true },
];

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem("completedSteps");
    return saved ? JSON.parse(saved) : [];
  });

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    const savedData = { ...defaultFormData };
    steps.forEach(({ key }) => {
      const local = localStorage.getItem(`form-${key}`);
      if (local) savedData[key] = JSON.parse(local);
    });
    setFormData(savedData);
  }, []);

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      [section]: updatedArray,
    }));
  };
  const removeItem = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      [section]: updatedArray,
    }));
  };

  const addItem = (section) => {
    let newItem = {};
    switch (section) {
      case "rooms":
        newItem = {
          "Room Name": "",
          "Room Type": "",
          "Maximum Occupancy": "",
          "Total Inventory": "",
          "Area size (sq.ft)": "",
          "Bed Type": "",
          "Connecting/Adjoining Rooms": "",
          Balcony: "",
          Windows: "",
          "Room View": "",
        };
        break;
      case "importantContacts":
        newItem = { name: "", phone: "", email: "" };
        break;
      case "transfers":
        newItem = {
          model: "",
          pickup: "",
          chargeable: "No",
          oneWay: "",
          twoWay: "",
        };
        break;
      case "cardsAccepted":
        newItem = { cardType: "", accepted: "No" };
        break;
      case "roomFacilities":
        newItem = { name: "", available: "No", complimentary: "No" };
        break;
      case "ratePlans":
        newItem = {
          "Rate Plan Name": "",
          "Rate Plan Type": "",
          "Linked Plan": "",
          "Linked to": "",
          "Sgl Rate": "",
          "Dbl Rate": "",
          "Rooms Applicable": "",
          Inclusions: "",
          "Minimum length of stay": "",
          "Maximum length of stay": "",
          "Lead Time": "",
          "Cancellation Policy": "",
          "Members only deal": "",
        };
        break;
      case "fbOptions":
        newItem = { name: "", cuisine: "", type: "", timings: "", meals: "" };
        break;
      default:
        newItem = {};
    }
    setFormData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const saveStepData = () => {
    const key = currentStep.key;
    localStorage.setItem(`form-${key}`, JSON.stringify(formData[key]));
    if (!completedSteps.includes(key)) {
      const updated = [...completedSteps, key];
      setCompletedSteps(updated);
      localStorage.setItem("completedSteps", JSON.stringify(updated));
    }
    alert(`${currentStep.label} saved.`);
  };

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };
  const renderStepSection = () => {
    switch (currentStep.key) {
      case "propertyDetails":
        return <PropertyDetails />;

      case "amenities":
        return <Amenities />;

      case "policies":
        return <Policies />;

      case "rooms":
        return <RoomOverview />;

      case "competitionHotels":
        return <CompitionHotels />;

      case "importantContacts":
        return <ImportantContacts />;

      case "transfers":
        return <Transfers />;

      case "touristInterest":
        return <TouristInterest />;

      case "cardsAccepted":
        return (
          <>
            {formData.cardsAccepted.map((card, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.75rem",
                  }}
                >
                  <h4 style={{ margin: 0 }}>Card {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem("cardsAccepted", idx)}
                  >
                    Delete
                  </button>
                </div>

                <div className="form-group horizontal">
                  <label>Card Type</label>
                  <input
                    type="text"
                    value={card.cardType}
                    onChange={(e) =>
                      handleArrayChange(
                        "cardsAccepted",
                        idx,
                        "cardType",
                        e.target.value
                      )
                    }
                  />

                  <label>Accepted</label>
                  <select
                    value={card.accepted}
                    onChange={(e) =>
                      handleArrayChange(
                        "cardsAccepted",
                        idx,
                        "accepted",
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
              onClick={() => addItem("cardsAccepted")}
            >
              + Add Card
            </button>
          </>
        );

      case "roomFacilities":
        return (
          <>
            {formData.roomFacilities.map((facility, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Facility {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem("roomFacilities", idx)}
                  >
                    Delete
                  </button>
                </div>
                <label>Facility</label>
                <input
                  type="text"
                  value={facility.name}
                  onChange={(e) =>
                    handleArrayChange(
                      "roomFacilities",
                      idx,
                      "name",
                      e.target.value
                    )
                  }
                />
                <label>Availability</label>
                <select
                  value={facility.available}
                  onChange={(e) =>
                    handleArrayChange(
                      "roomFacilities",
                      idx,
                      "available",
                      e.target.value
                    )
                  }
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label>Complimentary</label>
                <select
                  value={facility.complimentary}
                  onChange={(e) =>
                    handleArrayChange(
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
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("roomFacilities")}
            >
              + Add Facility
            </button>
          </>
        );

      case "ratePlans":
        return (
          <>
            {formData.ratePlans.map((plan, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>Rate Plan {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem("ratePlans", idx)}
                  >
                    Delete
                  </button>
                </div>
                {Object.keys(plan).map((field, fidx) => (
                  <React.Fragment key={fidx}>
                    <label>{field}</label>
                    <input
                      type="text"
                      value={plan[field]}
                      onChange={(e) =>
                        handleArrayChange(
                          "ratePlans",
                          idx,
                          field,
                          e.target.value
                        )
                      }
                    />
                  </React.Fragment>
                ))}
              </div>
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("ratePlans")}
            >
              + Add Rate Plan
            </button>
          </>
        );

      case "fbOptions":
        return (
          <>
            {formData.fbOptions.map((fb, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: "1px solid #ccc",
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "6px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <h4>F&B Option {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem("fbOptions", idx)}
                  >
                    Delete
                  </button>
                </div>
                <label>Restaurant Name</label>
                <input
                  type="text"
                  value={fb.name}
                  onChange={(e) =>
                    handleArrayChange("fbOptions", idx, "name", e.target.value)
                  }
                />
                <label>Cuisine</label>
                <input
                  type="text"
                  value={fb.cuisine}
                  onChange={(e) =>
                    handleArrayChange(
                      "fbOptions",
                      idx,
                      "cuisine",
                      e.target.value
                    )
                  }
                />
                <label>Type</label>
                <input
                  type="text"
                  value={fb.type}
                  onChange={(e) =>
                    handleArrayChange("fbOptions", idx, "type", e.target.value)
                  }
                />
                <label>Timings</label>
                <input
                  type="text"
                  value={fb.timings}
                  onChange={(e) =>
                    handleArrayChange(
                      "fbOptions",
                      idx,
                      "timings",
                      e.target.value
                    )
                  }
                />
                <label>Meals</label>
                <input
                  type="text"
                  value={fb.meals}
                  onChange={(e) =>
                    handleArrayChange("fbOptions", idx, "meals", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => addItem("fbOptions")}
            >
              + Add F&B Option
            </button>
          </>
        );

      default:
        return <p>Unknown section</p>;
    }
  };
  return (
    <div className="h-screen">
      {/* <h1 className="text-3xl font-bold mb-4">Hotel Onboarding Form</h1> */}
      <div className="grid grid-cols-4 gap-10 h-full">
        {/* Step Navigation Bar */}
        <div className="flex gap-6 bg-slate-800 text-white h-full p-4">
          <div className="relative flex flex-col items-center space-y-6 h-fit">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gray-500" />

            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.key);
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className={`relative z-10 flex items-center gap-4 cursor-pointer group ${
                    step.isDisabled ? "" : ""
                  }`}
                  onClick={() => !step.isDisabled && setCurrentStepIndex(index)}
                >
                  {/* Circle */}
                  <div
                    className={`size-7 rounded-full flex items-center justify-center transition-all duration-300
                ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                    ? "bg-blue-500"
                    : step.isDisabled
                    ? "bg-gray-700 opacity-25"
                    : "bg-gray-500"
                }`}
                  >
                    {isCompleted ? (
                      <span className="text-sm font-bold">✓</span>
                    ) : (
                      <span className={`text-sm font-bold `}>{index + 1}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col justify-start space-y-7">
            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.key);
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className={`transition-all duration-200 font-medium cursor-pointer
              ${
                isActive
                  ? "text-blue-400"
                  : isCompleted
                  ? "text-green-400"
                  : "text-gray-300"
              }`}
                  onClick={() => !step.isDisabled && setCurrentStepIndex(index)}
                >
                  {step.label}
                </div>
              );
            })}
          </div>

          {/* <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className={` ${index === currentStepIndex ? "active" : ""} ${
                  completedSteps.includes(step.key) ? "completed" : ""
                }`}
                onClick={() => setCurrentStepIndex(index)}
              >
                {step.label}
              </div>
            ))}
          </div> */}
        </div>

        {/* Step Content */}
        <form
          className="col-span-3 overflow-y-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl mb-2 font-semibold">
            {steps[currentStepIndex].label}
          </h1>
          {renderStepSection()}

          <div style={{ marginTop: "1rem" }}>
            <button type="button" onClick={saveStepData} className="submit-btn">
              Save & Next
            </button>

            {currentStepIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="submit-btn"
                style={{ marginLeft: "10px" }}
              >
                Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
