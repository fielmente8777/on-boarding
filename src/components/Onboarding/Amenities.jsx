import React from "react";

const amenitiesList = [
  "Outdoor Swimming Pool",
  "Lawns/Gardens",
  "Business Center",
  "Conference Hall",
  "Internet Facility",
  "Restaurant",
  "Barbeque Grill's",
  "Parking Facility",
  "Self Parking",
  "Airport Shuttle Service Available",
  "Railway Shuttle Service Available",
  "Indoor pool",
  "Bicycles",
  "Safari",
  "Dry Cleaning",
  "Laundry Service",
  "Luggage Storage",
  "Babysitting or Childcare",
  "Fireplace in Lobby",
  "Smoke-free Property",
  "Doctor on Call",
  "Designated Smoking Areas",
  "ATM/Banking",
  "Beauty Salon",
  "Safe Deposit Box At Front Desk",
  "Hair Dresser",
  "Use of nearby fitness center",
  "Sauna",
  "Playground on site",
  "Golf course in house",
  "Currency Exchange",
  "Porter/bellhop",
  "Gift Shops",
  "Tour/Tickets Assistance",
  "Nightclub",
  "Picnic Area",
  "Terrace",
  "Library",
  "Gaming Zone",
  "Access to nearby outdoor pool",
  "Hiking/ Biking trails",
  "Golf course nearby",
  "Meeting Rooms",
  "Wedding Facility",
  "Access to nearby health club",
  "Children's pool",
  "Spa hot tub",
  "Tennis on site",
  "Health club/ Fitness facility",
  "Gym",
  "Children's club",
  "Yoga",
  "Mountain biking",
  "Elevator",
  "Indore Games",
  "Bar",
  "Express Check In",
  "Concierge",
  "Daily Newspaper In lobby",
];

// amenitiesList.forEach((a) => (defaultFormData.amenities[a] = "No"));

const Amenities = ({ formData, handleChange }) => {
  return (
    <div className="grid grid-cols-2 gap-5">
      {amenitiesList.map((amenity, idx) => (
        <div key={idx} className="space-y-1">
          <label className="font-semibold">{amenity}</label>
          <select
            value={formData.amenities[amenity]}
            onChange={(e) => handleChange("amenities", amenity, e.target.value)}
            className="col-span-full w-full p-3 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
