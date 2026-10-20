import axios from "axios";
import { BASE_URL, GIAN_URL } from "../constants/constant";

const FACILITY_KEYS = [
  "FrontDesk",
  "Wifi",
  "Board",
  "Rooftop_Cafe",
  "Health_Club",
  "Express_checks",
  "Wave_Bar",
  "Conference_Hall",
  "Alchemy",
  "Suncafe",
  "Doctor",
  "Spa",
  "Babysitting",
  "Electricity",
  "Concierge",
  "Conditinoer",
  "Security",
  "TravelTour",
  "Currency_Exchange",
  "Laundry",
  "Casino",
  "Parking",
  "Elevator",
  "Jacuzzi",
  "Room_Service",
  "Accept_Cards",
  "Child_Care",
  "Conference_Rooms",
  "Fitness_Center",
  "Health_&_Beauty",
  "Restaurant",
  "Swimming_Pool",
  "Housekeep",
  "cofeemaker",
  "minibar",
  "Evpoint",
  "SaunaStream",
];

// The form keeps the country code apart from the number; both backends
// expect one string.
const fullPhone = (p) =>
  [p.hotelPhoneCode, p.hotelPhone].filter(Boolean).join(" ");

// "Welcome to Sunrise Resort, a resort in Goa, India."
const defaultDescription = (p) => {
  const place = [p.city, p.country].filter(Boolean).join(", ");
  const type = (p.accommodationType || "Hotel").toLowerCase();
  return `Welcome to ${p.hotelName}${place ? `, a ${type} in ${place}` : ""}.`;
};

// Same payload shape the Eazotel website sends to nexon /eazotel/createwebsite
// (see Eazotel/src/components/Registration.jsx), filled from the onboarding form.
const buildWebsitePayload = (token, p) => ({
  Token: token,
  template: "1",
  hotelName: p.hotelName,
  hotelPhone: fullPhone(p),
  // nexon copies hotelAddress into the first location's `local`, which both
  // dashboards show as the property name (an empty one stays empty, it does
  // not fall back to hotelName). So it gets the hotel name; the street
  // address stays in gian's onboarding record.
  hotelAddress: p.hotelName,
  hotelState: p.state,
  hotelCity: p.city,
  hotelCountry: p.country,
  hotelPinCode: p.pinCode,
  hotelEmail: p.hotelEmail,
  oldWebsite: p.hotelWebsite || "",
  planName: "P1",
  category: p.accommodationType || "Hotel",
  currency: p.currency || "INR",
  starRating: p.starCategory || "3",
  hasPool: "false",
  breakfastOption: [],
  serveBreakfast: "false",
  breakfastIncluded: "false",
  parkingType: "",
  parkingAvailability: "false",
  parkingCost: "",
  parkingLocation: "",
  pricingStructure: "",
  reservationRequirement: "false",
  logo: "",
  totalroomCategory: "0",
  roomCategories: [],
  bannerVideo: "",
  // An empty description is saved by nexon as the text "hotelDescription",
  // which then shows on the website, so fall back to a plain sentence.
  hotelDescription: p.hotelDescription?.trim() || defaultDescription(p),
  customDomain: "",
  colorCombination: {
    backgroundColor: "#153B5B",
    buttonColor: "#0A3A75",
    fontColor: "#0A3A75",
    boardColor: "#0A3A75",
  },
  Facilities: Object.fromEntries(
    FACILITY_KEYS.map((k) => [k, k === "FrontDesk" ? "true" : "false"]),
  ),
  checkInFrom: "12:00",
  checkInUntil: "23:59",
  petCharges: "",
  allowPets: "false",
  checkOutFrom: "07:00",
  allowChildren: "true",
  checkOutUntil: "11:00",
  languages: ["English"],
  pagesRequired: {},
  establishedSince: p.yearBuilt || "",
  document: {},
  otaRequired: {},
});

// Creates the website / CMS data on nexon. Must run before gian onboarding:
// gian then finds the Zucks_profile and links the trial subscription to it.
export const createWebsite = async (token, propertyDetails) => {
  const { data } = await axios.post(
    `${BASE_URL}/eazotel/createwebsite`,
    buildWebsitePayload(token, propertyDetails),
  );
  if (data?.Status !== true) {
    throw new Error(data?.Message || "Could not create your website.");
  }
  return data;
};

// Creates the trial subscription and stores the onboarding form on gian.
// Resolves to { status, message } instead of throwing on 4xx/5xx so the
// caller can tell "already onboarded" (409) apart from real failures.
export const submitOnboarding = async (token, formData) => {
  const { hotelPhoneCode, hotelPhoneIso, ...propertyDetails } =
    formData.propertyDetails;
  const body = {
    ...formData,
    propertyDetails: {
      ...propertyDetails,
      hotelPhone: fullPhone(formData.propertyDetails),
    },
  };
  const res = await axios.post(`${GIAN_URL}/onboarding`, body, {
    headers: { Authorization: `Bearer ${token}` },
    validateStatus: () => true,
  });
  return {
    status: res.data?.responseStatusCode ?? res.status,
    message: res.data?.responseMessage || res.data?.message,
  };
};
