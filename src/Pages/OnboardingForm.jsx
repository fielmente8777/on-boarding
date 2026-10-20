import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import PropertyDetails from "../components/Onboarding/PropertyDetails";
import PropertySearch from "../components/Onboarding/PropertySearch";
import Amenities from "../components/Onboarding/Amenities";
import Policies from "../components/Onboarding/Policies";
import RoomOverview from "../components/Onboarding/RoomOverview";
import CompitionHotels from "../components/Onboarding/CompitionHotels";
import ImportantContacts from "../components/Onboarding/ImportantContacts";
import Transfers from "../components/Onboarding/Transfers";
import TouristInterest from "../components/Onboarding/TouristInterest";
import RoomFacilities from "../components/Onboarding/RoomFacilities";
import RatePlans from "../components/Onboarding/RatePlans";
import FBOptions from "../components/Onboarding/FBOptions";
import CardAccepted from "../components/Onboarding/CardAccepted";
import { defaultFormData } from "../constats/formData";
import {
  propertySections,
  requiredPropertyFields,
} from "../constats/formInput";
import { createWebsite, submitOnboarding } from "../utils/onboardingApi";
import { detectCountry, splitPhone } from "../utils/countryMeta";

const steps = [
  { key: "propertyDetails", label: "Property Details" },
  // { key: "amenities", label: "Amenities" },
  // { key: "policies", label: "Policies" },
  // { key: "rooms", label: "Room Overview" },
  // { key: "competitionHotels", label: "Competition Hotels" },
  // { key: "importantContacts", label: "Important Contacts" },
  // { key: "transfers", label: "Transfers" },
  // { key: "touristInterest", label: "Tourist Interest" },
  // { key: "cardsAccepted", label: "Cards Accepted" },
  // { key: "roomFacilities", label: "Room Facilities" },
  // { key: "ratePlans", label: "Rate Plans" },
  // { key: "fbOptions", label: "F&B Options" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Set once nexon has created the website, so a retry after a gian failure
// does not create a second website for the same user.
const WEBSITE_CREATED_KEY = "onboarding-website-created";

const tokenEmail = (token) => {
  try {
    return JSON.parse(
      atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")),
    )?.Email;
  } catch {
    return null;
  }
};

const validate = (propertyDetails) => {
  const errors = {};
  requiredPropertyFields.forEach(({ key, label }) => {
    if (!String(propertyDetails[key] ?? "").trim()) {
      errors[key] = `${label} is required`;
    }
  });
  if (
    propertyDetails.hotelEmail &&
    !EMAIL_RE.test(propertyDetails.hotelEmail)
  ) {
    errors.hotelEmail = "Enter a valid email address";
  }
  if (
    propertyDetails.hotelPhone &&
    propertyDetails.hotelPhone.replace(/\D/g, "").length < 7
  ) {
    errors.hotelPhone = "Enter a valid phone number";
  }
  return errors;
};

const loadSavedForm = () => {
  const saved = { ...defaultFormData };
  const email = tokenEmail(localStorage.getItem("token") || "");
  steps.forEach(({ key }) => {
    try {
      const local = JSON.parse(localStorage.getItem(`form-${key}`));
      if (local) saved[key] = { ...defaultFormData[key], ...local };
    } catch {
      // ignore corrupt drafts
    }
  });
  // Phone code defaults to the visitor's country (device time zone). Older
  // drafts kept "+91 98765 43210" in hotelPhone, so split those.
  const p = saved.propertyDetails;
  if (!p.hotelPhoneCode) {
    const { code: c, iso3 } = detectCountry();
    const {
      code,
      iso3: iso,
      number,
    } = splitPhone(p.hotelPhone, { code: c, iso3 });
    saved.propertyDetails = {
      ...p,
      hotelPhone: number,
      hotelPhoneCode: code,
      hotelPhoneIso: iso,
    };
  }
  // The sign-in email is usually the hotel's email too; saves typing it.
  if (email && !saved.propertyDetails.hotelEmail) {
    saved.propertyDetails = { ...saved.propertyDetails, hotelEmail: email };
  }
  return saved;
};

const OnboardingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(loadSavedForm);
  const [currentStepIndex] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState("");
  // "find" = look the property up on Google first; a saved draft skips it.
  const [phase, setPhase] = useState(() =>
    formData.propertyDetails.hotelName ? "details" : "find",
  );
  const [pickedTitle, setPickedTitle] = useState("");
  // Fields filled from Google, flagged so the hotel checks them.
  const [autofilled, setAutofilled] = useState(() => new Set());

  const currentStep = steps[currentStepIndex];

  // Autosave drafts so a refresh or expired session doesn't lose the form.
  useEffect(() => {
    steps.forEach(({ key }) => {
      localStorage.setItem(`form-${key}`, JSON.stringify(formData[key]));
    });
  }, [formData]);

  const sectionProgress = useMemo(
    () =>
      propertySections.map((section) => {
        const required = section.fields.filter((f) => f.required);
        const filled = required.filter((f) =>
          String(formData.propertyDetails[f.key] ?? "").trim(),
        );
        return {
          title: section.title,
          optional: section.optional,
          done: required.length > 0 && filled.length === required.length,
        };
      }),
    [formData.propertyDetails],
  );

  const requiredFilled = requiredPropertyFields.filter((f) =>
    String(formData.propertyDetails[f.key] ?? "").trim(),
  ).length;
  const progress = Math.round(
    (requiredFilled / requiredPropertyFields.length) * 100,
  );

  const handleChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    if (errors[field]) {
      setErrors(({ [field]: _, ...rest }) => rest);
    }
    if (section === "propertyDetails" && autofilled.has(field)) {
      setAutofilled((prev) => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const showDetails = () => {
    setPhase("details");
    window.scrollTo({ top: 0 });
  };

  // Fills the form from a Google listing; empty values never wipe typed ones.
  const fillPropertyDetails = (match) => {
    const { hotelPhone, ...details } = match.details;
    const current = formData.propertyDetails;
    if (hotelPhone) {
      const phone = splitPhone(
        hotelPhone,
        { code: current.hotelPhoneCode, iso3: current.hotelPhoneIso },
        details.country,
      );
      Object.assign(details, {
        hotelPhone: phone.number,
        hotelPhoneCode: phone.code,
        hotelPhoneIso: phone.iso3,
      });
    }
    const found = Object.fromEntries(
      Object.entries(details).filter(([, v]) => String(v ?? "").trim()),
    );
    setFormData((prev) => ({
      ...prev,
      propertyDetails: { ...prev.propertyDetails, ...found },
    }));
    setErrors((prev) =>
      Object.fromEntries(Object.entries(prev).filter(([k]) => !(k in found))),
    );
    setAutofilled(new Set(Object.keys(found)));
    setPickedTitle(match.title);
    showDetails();
  };

  const enterManually = (name) => {
    if (name) handleChange("propertyDetails", "hotelName", name);
    setAutofilled(new Set());
    setPickedTitle("");
    showDetails();
  };

  const handleArrayChange = (section, index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[section]];
      updated[index] = field ? { ...updated[index], [field]: value } : value;
      return { ...prev, [section]: updated };
    });
  };

  const removeItem = (section, index) => {
    setFormData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const addItem = (section) => {
    setFormData((prev) => ({
      ...prev,
      [section]: [...(prev[section] || []), {}],
    }));
  };

  const renderStepSection = () => {
    const listProps = {
      formData,
      handleChange: handleArrayChange,
      addItem,
      removeItem,
    };
    switch (currentStep.key) {
      case "propertyDetails":
        return (
          <PropertyDetails
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            autofilled={autofilled}
          />
        );
      case "amenities":
        return <Amenities formData={formData} handleChange={handleChange} />;
      case "policies":
        return <Policies formData={formData} handleChange={handleChange} />;
      case "rooms":
        return (
          <RoomOverview
            {...listProps}
            formData={{ ...formData, rooms: formData.rooms || [] }}
            setFormData={setFormData}
          />
        );
      case "competitionHotels":
        return <CompitionHotels {...listProps} />;
      case "importantContacts":
        return <ImportantContacts {...listProps} />;
      case "transfers":
        return <Transfers {...listProps} />;
      case "touristInterest":
        return <TouristInterest {...listProps} />;
      case "cardsAccepted":
        return <CardAccepted {...listProps} />;
      case "roomFacilities":
        return <RoomFacilities {...listProps} />;
      case "ratePlans":
        return <RatePlans {...listProps} />;
      case "fbOptions":
        return <FBOptions {...listProps} />;
      default:
        return <p>Unknown section</p>;
    }
  };

  const sessionExpired = () => {
    localStorage.removeItem("token");
    Swal.fire({
      title: "Session expired",
      text: "Please sign in again. Your details have been saved.",
      icon: "info",
      confirmButtonColor: "#0A3A75",
    }).then(() => navigate("/sign-in"));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(formData.propertyDetails);
    setErrors(validationErrors);
    const firstError = Object.keys(validationErrors)[0];
    if (firstError) {
      const el = document.getElementById(firstError);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return sessionExpired();

    try {
      const account = tokenEmail(token) || token;
      if (localStorage.getItem(WEBSITE_CREATED_KEY) !== account) {
        setSubmitting("Creating your website…");
        await createWebsite(token, formData.propertyDetails);
        localStorage.setItem(WEBSITE_CREATED_KEY, account);
      }

      setSubmitting("Setting up your account…");
      const { status, message } = await submitOnboarding(token, formData);

      if (status === 200 || status === 201) {
        steps.forEach(({ key }) => localStorage.removeItem(`form-${key}`));
        localStorage.removeItem(WEBSITE_CREATED_KEY);
        navigate("/thank-you", { replace: true });
      } else if (status === 409) {
        Swal.fire({
          title: "Already onboarded",
          text: message || "You are already onboarded with us!",
          icon: "warning",
          confirmButtonText: "Go to dashboard",
          confirmButtonColor: "#0A3A75",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "https://dashboard.eazotel.com/login";
          }
        });
      } else if (status === 401 || /jwt|authenticated/i.test(message || "")) {
        sessionExpired();
      } else {
        throw new Error(message || "Something went wrong!");
      }
    } catch (error) {
      Swal.fire({
        title: "Couldn't complete onboarding",
        text: error?.response?.data?.Message || error.message,
        icon: "error",
        confirmButtonText: "Close",
        confirmButtonColor: "#0A3A75",
      });
    } finally {
      setSubmitting("");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const header = (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <img
          src="/EAZOTEL LOGO.png"
          alt="Eazotel"
          className="h-9 w-auto object-contain"
        />
        <button
          type="button"
          onClick={handleSignOut}
          className="text-sm font-medium text-gray-500 transition hover:text-[#0A3A75]"
        >
          Sign out
        </button>
      </div>
    </header>
  );

  if (phase === "find") {
    return (
      <div className="min-h-screen bg-[#F4F7FB]">
        {header}
        <div className="px-4 py-10 md:py-16">
          <PropertySearch
            email={tokenEmail(localStorage.getItem("token") || "")}
            initialQuery={formData.propertyDetails.hotelName}
            onPick={fillPropertyDetails}
            onManual={enterManually}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F7FB]">
      {header}

      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[260px_1fr]">
        {/* Sidebar progress */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl bg-[#0A3A75] p-6 text-white shadow-lg">
            <p className="text-xs uppercase tracking-widest text-blue-200">
              Step 2 of 2
            </p>
            <h2 className="mt-1 text-xl font-semibold">{currentStep.label}</h2>

            <div className="mt-5">
              <div className="flex justify-between text-xs text-blue-200">
                <span>Required fields</span>
                <span>{progress}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-[#fc5f07] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <ul className="mt-6 space-y-3">
              {sectionProgress.map((s) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(`section-${s.title}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" })
                    }
                    className="flex w-full items-center gap-3 text-left text-sm text-blue-100 transition hover:text-white"
                  >
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                        s.done
                          ? "bg-green-400 text-[#0A3A75]"
                          : "border border-blue-300/60"
                      }`}
                    >
                      {s.done ? "✓" : ""}
                    </span>
                    {s.title}
                    {s.optional && (
                      <span className="ml-auto text-[10px] text-blue-300">
                        optional
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <form onSubmit={handleFormSubmit} noValidate className="min-w-0">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#0A3A75] md:text-3xl">
              Check your property details
            </h1>
            <p className="mt-1 text-gray-500">
              We'll use these details to build your website, booking engine and
              dashboard. Fields marked <span className="text-[#fc5f07]">*</span>{" "}
              are required.
            </p>
          </div>

          <div
            className={`mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-4 text-sm ${
              pickedTitle
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-gray-200 bg-white text-gray-600"
            }`}
          >
            <p>
              {pickedTitle ? (
                <>
                  ✓ Filled in from <strong>{pickedTitle}</strong> on Google.
                  Check the fields marked <em>From Google</em> and add anything
                  missing.
                </>
              ) : (
                "Want us to fill this in for you? Look your property up on Google."
              )}
            </p>
            <button
              type="button"
              onClick={() => setPhase("find")}
              className="shrink-0 font-semibold text-[#0A3A75] underline-offset-4 hover:underline"
            >
              {pickedTitle
                ? "Not your property? Search again"
                : "Search Google"}
            </button>
          </div>

          {renderStepSection()}

          {/* Sticky submit bar */}
          <div className="sticky bottom-0 z-10 -mx-4 mt-8 border-t border-gray-200 bg-white/95 px-4 py-4 backdrop-blur md:mx-0 md:rounded-2xl md:border md:shadow-lg">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-[#0A3A75]">
                  {requiredFilled}/{requiredPropertyFields.length}
                </span>{" "}
                required fields completed
              </p>
              <button
                type="submit"
                disabled={!!submitting}
                className="inline-flex items-center gap-2 rounded-lg bg-[#fc5f07] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#e55406] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting && (
                  <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {submitting || "Complete Onboarding"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OnboardingForm;
