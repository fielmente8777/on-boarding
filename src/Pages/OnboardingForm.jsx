import React, { useEffect, useState } from "react";
import PropertyDetails from "../components/Onboarding/PropertyDetails";
import Amenities from "../components/Onboarding/Amenities";
import Policies from "../components/Onboarding/Policies";
import RoomOverview from "../components/Onboarding/RoomOverview";
import CompitionHotels from "../components/Onboarding/CompitionHotels";
import ImportantContacts from "../components/Onboarding/ImportantContacts";
import Transfers from "../components/Onboarding/Transfers";
import TouristInterest from "../components/Onboarding/TouristInterest";
import { defaultFormData } from "../constats/formData";
import RoomFacilities from "../components/Onboarding/RoomFacilities";
import RatePlans from "../components/Onboarding/RatePlans";
import FBOptions from "../components/Onboarding/FBOptions";
import CardAccepted from "../components/Onboarding/CardAccepted";

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

const OnboardingForm = () => {
  const [stepTraversed, setStepTraversed] = useState([]);
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem("completedSteps");
    return saved ? JSON.parse(saved) : [];
  });

  const currentStep = steps[currentStepIndex];

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

    if (!field) {
      updatedArray[index] = value;
      setFormData((prev) => ({
        ...prev,
        [section]: updatedArray,
      }));
      return;
    }

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
    console.log(section);
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

    if (!completedSteps.includes(key)) {
      const updated = [...completedSteps, key];
      setCompletedSteps(updated);
    }

    setCurrentStepIndex(currentStepIndex + 1);
  };

  const goToNextStep = () => {
    let allFieldsEmpty = false;
    const currentForm = formData[currentStep.key];

    if (typeof currentForm === "object" && !Array.isArray(currentForm)) {
      allFieldsEmpty = Object.values(currentForm).every(
        (value) =>
          value === undefined ||
          value === null ||
          value.toString().trim() === ""
      );
    } else {
      allFieldsEmpty = currentForm.every((item) => {
        if (typeof item === "object" && item !== null) {
          return Object.values(item).every(
            (val) =>
              val === undefined || val === null || val.toString().trim() === ""
          );
        }
        return (
          item === undefined || item === null || item.toString().trim() === ""
        );
      });
    }

    if (allFieldsEmpty) {
      alert("Please fill in at least one field before continuing.");
      return;
    }

    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);

      if (!completedSteps.includes(currentStep.key)) {
        const updated = [...stepTraversed, currentStep.key];
        setStepTraversed(updated);
      }
    }
  };

  const goToPrevStep = () => {
    if (currentStepIndex > 0) {
      setStepTraversed((prev) =>
        prev.filter((step) => step !== currentStep.key)
      );
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };
  const renderStepSection = () => {
    switch (currentStep.key) {
      case "propertyDetails":
        return (
          <PropertyDetails formData={formData} handleChange={handleChange} />
        );

      case "amenities":
        return <Amenities formData={formData} handleChange={handleChange} />;

      case "policies":
        return <Policies formData={formData} handleChange={handleChange} />;

      case "rooms":
        return (
          <RoomOverview formData={formData} handleChange={handleArrayChange} />
        );

      case "competitionHotels":
        return (
          <CompitionHotels
            formData={formData}
            handleChange={handleArrayChange}
          />
        );

      case "importantContacts":
        return (
          <ImportantContacts
            formData={formData}
            handleChange={handleArrayChange}
          />
        );

      case "transfers":
        return (
          <Transfers formData={formData} handleChange={handleArrayChange} />
        );

      case "touristInterest":
        return (
          <TouristInterest
            formData={formData}
            handleChange={handleArrayChange}
          />
        );

      case "cardsAccepted":
        return (
          <CardAccepted formData={formData} handleChange={handleArrayChange} />
        );

      case "roomFacilities":
        return (
          <RoomFacilities
            formData={formData}
            handleChange={handleArrayChange}
          />
        );

      case "ratePlans":
        return (
          <RatePlans formData={formData} handleChange={handleArrayChange} />
        );

      case "fbOptions":
        return (
          <FBOptions formData={formData} handleChange={handleArrayChange} />
        );

      default:
        return <p>Unknown section</p>;
    }
  };

  // const handleFormSubmit = (e) => {
  //   e.preventDefault();

  //   console.log(formData);
  // };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    console.log("FINAL DATA:", formData);

    try {
      const res = await fetch("http://localhost:8000/api/v1/onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const savedData = { ...defaultFormData };
    steps.forEach(({ key }) => {
      const local = localStorage.getItem(`form-${key}`);
      if (local) savedData[key] = JSON.parse(local);
    });
    setFormData(savedData);
  }, []);

  return (
    <div className="h-screen">
      {/* <h1 className="text-3xl font-bold mb-4">Hotel Onboarding Form</h1> */}
      <div className="grid grid-cols-4 h-full">
        {/* Step Navigation Bar */}
        <div className="flex gap-6 bg-slate-800 text-white h-full p-4">
          <div className="relative flex flex-col items-center space-y-6 h-fit">
            {/* Vertical Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gray-500" />

            {steps.map((step, index) => {
              const isCompleted = completedSteps.includes(step.key);
              const isTraversed = stepTraversed.includes(step.key);
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className={`relative z-10 flex items-center gap-4 cursor-pointer group ${
                    step.isDisabled ? "" : ""
                  }`}
                  // onClick={() => !step.isDisabled && setCurrentStepIndex(index)}
                >
                  {/* Circle */}
                  <div
                    className={`size-7 rounded-full flex items-center justify-center transition-all duration-300
                ${
                  isCompleted
                    ? "bg-green-500"
                    : isActive
                      ? "bg-blue-500"
                      : isTraversed
                        ? "bg-blue-500"
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
              const isTraversed = stepTraversed.includes(step.key);
              const isActive = index === currentStepIndex;

              return (
                <div
                  key={step.key}
                  className={`transition-all duration-200 font-medium cursor-pointer
              ${
                isActive
                  ? "text-blue-300"
                  : isCompleted
                    ? "text-green-400"
                    : isTraversed
                      ? "text-blue-400"
                      : "text-gray-400"
              }`}
                  // onClick={() => {
                  //   if (!step.isDisabled) {
                  //     // setStepTraversed([...stepTraversed, index]);
                  //     // setCurrentStepIndex(index);
                  //   }
                  // }}
                >
                  {step.label}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <form
          className="col-span-3 overflow-y-auto p-4"
          onSubmit={handleFormSubmit}
        >
          <h1 className="text-2xl mb-2 font-semibold">
            {steps[currentStepIndex].label}
          </h1>
          {renderStepSection()}

          <div className="flex gap-4 items-center">
            <button
              disabled={currentStepIndex === 0}
              type="button"
              onClick={goToPrevStep}
              className={`submit-btn ${
                currentStepIndex === 0
                  ? "opacity-50 bg-black"
                  : "cursor-pointer"
              }`}
            >
              Prev
            </button>

            {currentStepIndex < steps.length - 1 && (
              <button
                type="button"
                onClick={goToNextStep}
                className="submit-btn"
              >
                Next
              </button>
            )}

            {currentStepIndex === steps.length - 1 ? (
              <button
                type="submit"
                // onClick={saveStepData}
                className="submit-btn"
              >
                Submit
              </button>
            ) : (
              <button
                type="button"
                onClick={saveStepData}
                className="submit-btn"
              >
                Save & Next
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
