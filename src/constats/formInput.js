export const propertyFields = [
  { key: "hotelName", label: "Hotel Name", type: "text" },
  { key: "address", label: "Address", type: "text" },
  { key: "locality", label: "Locality ", type: "text" },
  {key:"pinCode", label:"Pin Code", type:"text", maxLength:6},
  {key:"city",label:"City",type:"text"},
  {key:"state",label:"State",type:"text"},
  {key:"country",label:"Country",type:"text"},
  {key:"hotelPhone",label:"Hotel Phone Number",type:"text", minLength:10, maxLength:15},
  

  // Distances Group
  { group: "Distances from Key Locations" },
  {
    key: "distanceIntlAirport",
    label: "International Airport (km)",
    type: "number",
  },
  {
    key: "distanceDomesticAirport",
    label: "Domestic Airport (km)",
    type: "number",
  },
  {
    key: "distanceRailwayStation",
    label: "Railway Station (km)",
    type: "number",
  },
  {
    key: "distancePublicTransport",
    label: "Nearest Public Transport & Distance (km)",
    type: "text",
  },

  { key: "hotelWebsite", label: "Hotel Website", type: "url" },
  { key: "yearBuilt", label: "Year Built", type: "number" },
  { key: "renovationYear", label: "Recent Renovation Year", type: "number" },
  { key: "latitude", label: "Latitude", type: "number", step: "any" },
  { key: "longitude", label: "Longitude", type: "number", step: "any" },
  {
    key: "starCategory",
    label: "Star Category",
    type: "select",
    options: ["1", "2", "3", "4", "5"],
  },
  { key: "accommodationType", label: "Type of Accommodation", type: "text" },
  { key: "hotelDescription", label: "Hotel Description", type: "textarea" },
  {key:"currency", label:"Currency", type:"select", options:["USD","INR","EUR","GBP","JPY","CNY","AUD","CAD","CHF","HKD"]},
];
