import React, { useState, useEffect } from 'react';
import './App.css'

const defaultFormData = {
  propertyDetails: {
    'Hotel Name': '', 'Address': '', 'Locality & Pincode': '', 'Distance from International Airport': '',
    'Distance from Domestic Airport': '', 'Distance from Railway Station': '', 'Hotel Website': '',
    'Year Built': '', 'Recent Renovation Year': '', 'Latitude': '', 'Longitude': '', 'Star Category': '',
    'Nearest Public Transport & Distance from hotel': '', 'Type of Accomodation': '', 'Hotel Description': ''
  },
  amenities: {},
  policies: {
    '24 hrs Check-In': 'No', '24 hrs Check-Out': 'No', 'Standard Check-In Time': '', 'Standard Check-Out Time': '',
    'Early Check-In': '', 'Late Check-Out': '', 'Visitors Allowed': '', 'Pets Allowed': '',
    'Children allowed in hotel': '', 'Complimentary stay for children until age of 6': '',
    'Extra bed required from age of': '', 'Minimum age of Check-in': '', 'Alcohol allowed onsite': '',
    'Alcohol Served onsite': '', 'Stag/ bachelor and hen/ bachelorette parties': '', 'Extra bed Charges (Adult)': '',
    'Extra bed Charges (Child)': '', 'Cancellation Policy': ''
  },
  rooms: [],
  competitionHotels: [],
  importantContacts: [],
  transfers: [],
  touristInterest: [],
  cardsAccepted: [],
  roomFacilities: [],
  ratePlans: [],
  fbOptions: []
};

const amenitiesList = ["Outdoor Swimming Pool", "Lawns/Gardens", "Business Center", "Conference Hall", "Internet Facility", "Restaurant",
  "Barbeque Grill's", "Parking Facility", "Self Parking", "Airport Shuttle Service Available",
  "Railway Shuttle Service Available", "Indoor pool", "Bicycles", "Safari", "Dry Cleaning", "Laundry Service",
  "Luggage Storage", "Babysitting or Childcare", "Fireplace in Lobby", "Smoke-free Property", "Doctor on Call",
  "Designated Smoking Areas", "ATM/Banking", "Beauty Salon", "Safe Deposit Box At Front Desk", "Hair Dresser",
  "Use of nearby fitness center", "Sauna", "Playground on site", "Golf course in house", "Currency Exchange",
  "Porter/bellhop", "Gift Shops", "Tour/Tickets Assistance", "Nightclub", "Picnic Area", "Terrace", "Library",
  "Gaming Zone", "Access to nearby outdoor pool", "Hiking/ Biking trails", "Golf course nearby", "Meeting Rooms",
  "Wedding Facility", "Access to nearby health club", "Children's pool", "Spa hot tub", "Tennis on site",
  "Health club/ Fitness facility", "Gym", "Children's club", "Yoga", "Mountain biking", "Elevator", "Indore Games",
  "Bar", "Express Check In", "Concierge", "Daily Newspaper In lobby"];
amenitiesList.forEach(a => defaultFormData.amenities[a] = 'No');

const steps = [
  { key: 'propertyDetails', label: 'Property Details' },
  { key: 'amenities', label: 'Amenities' },
  { key: 'policies', label: 'Policies' },
  { key: 'rooms', label: 'Room Overview' },
  { key: 'competitionHotels', label: 'Competition Hotels' },
  { key: 'importantContacts', label: 'Important Contacts' },
  { key: 'transfers', label: 'Transfers' },
  { key: 'touristInterest', label: 'Tourist Interest' },
  { key: 'cardsAccepted', label: 'Cards Accepted' },
  { key: 'roomFacilities', label: 'Room Facilities' },
  { key: 'ratePlans', label: 'Rate Plans' },
  { key: 'fbOptions', label: 'F&B Options' }
];

const App = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(() => {
    const saved = localStorage.getItem('completedSteps');
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
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    updatedArray[index] = {
      ...updatedArray[index],
      [field]: value
    };
    setFormData(prev => ({
      ...prev,
      [section]: updatedArray
    }));
  };
  const removeItem = (section, index) => {
    const updatedArray = formData[section].filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      [section]: updatedArray
    }));
  };

  const addItem = (section) => {
    let newItem = {};
    switch (section) {
      case 'rooms':
        newItem = {
          'Room Name': '', 'Room Type': '', 'Maximum Occupancy': '', 'Total Inventory': '',
          'Area size (sq.ft)': '', 'Bed Type': '', 'Connecting/Adjoining Rooms': '', 'Balcony': '',
          'Windows': '', 'Room View': ''
        }; break;
      case 'importantContacts':
        newItem = { name: '', phone: '', email: '' }; break;
      case 'transfers':
        newItem = { model: '', pickup: '', chargeable: 'No', oneWay: '', twoWay: '' }; break;
      case 'cardsAccepted':
        newItem = { cardType: '', accepted: 'No' }; break;
      case 'roomFacilities':
        newItem = { name: '', available: 'No', complimentary: 'No' }; break;
      case 'ratePlans':
        newItem = {
          'Rate Plan Name': '', 'Rate Plan Type': '', 'Linked Plan': '', 'Linked to': '',
          'Sgl Rate': '', 'Dbl Rate': '', 'Rooms Applicable': '', 'Inclusions': '',
          'Minimum length of stay': '', 'Maximum length of stay': '', 'Lead Time': '',
          'Cancellation Policy': '', 'Members only deal': ''
        }; break;
      case 'fbOptions':
        newItem = { name: '', cuisine: '', type: '', timings: '', meals: '' }; break;
      default: newItem = {};
    }
    setFormData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const saveStepData = () => {
    const key = currentStep.key;
    localStorage.setItem(`form-${key}`, JSON.stringify(formData[key]));
    if (!completedSteps.includes(key)) {
      const updated = [...completedSteps, key];
      setCompletedSteps(updated);
      localStorage.setItem('completedSteps', JSON.stringify(updated));
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
      case 'propertyDetails':
        return Object.keys(formData.propertyDetails).map((field, idx) => (
          <div key={idx} className="form-group">
            <label>{field}</label>
            <input
              type="text"
              value={formData.propertyDetails[field]}
              onChange={(e) => handleChange('propertyDetails', field, e.target.value)}
            />
          </div>
        ));

      case 'amenities':
        return amenitiesList.map((amenity, idx) => (
          <div key={idx} className="form-group horizontal">
            <label>{amenity}</label>
            <select
              value={formData.amenities[amenity]}
              onChange={(e) => handleChange('amenities', amenity, e.target.value)}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        ));

      case 'policies':
        return Object.keys(formData.policies).map((field, idx) => (
          <div key={idx} className="form-group">
            <label>{field}</label>
            <input
              type="text"
              value={formData.policies[field]}
              onChange={(e) => handleChange('policies', field, e.target.value)}
            />
          </div>
        ));

      case 'rooms':
        return (
          <>
            {formData.rooms.map((room, idx) => (
              <div key={idx} className="room-entry" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Room {idx + 1}</h3>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem('rooms', idx)}
                    style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
                {Object.keys(room).map((field, fidx) => (
                  <div key={fidx} className="form-group">
                    <label>{field}</label>
                    <input
                      type="text"
                      value={room[field]}
                      onChange={(e) => handleArrayChange('rooms', idx, field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('rooms')}>+ Add Room</button>
          </>
        );


      case 'competitionHotels':
        return (
          <>
            {formData.competitionHotels.map((hotel, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Hotel {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem('competitionHotels', idx)}
                  >
                    Delete
                  </button>
                </div>
                <input
                  type="text"
                  value={hotel}
                  onChange={(e) => {
                    const updated = [...formData.competitionHotels];
                    updated[idx] = e.target.value;
                    setFormData(prev => ({ ...prev, competitionHotels: updated }));
                  }}
                  placeholder="Hotel name"
                />
              </div>
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => setFormData(prev => ({
                ...prev,
                competitionHotels: [...prev.competitionHotels, '']
              }))}
            >
              + Add Hotel
            </button>
          </>
        );


      case 'importantContacts':
        return (
          <>
            {formData.importantContacts.map((contact, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Contact {idx + 1}</h3>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem('importantContacts', idx)}
                    style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
                <label>Name</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => handleArrayChange('importantContacts', idx, 'name', e.target.value)}
                />
                <label>Phone</label>
                <input
                  type="text"
                  value={contact.phone}
                  onChange={(e) => handleArrayChange('importantContacts', idx, 'phone', e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  value={contact.email}
                  onChange={(e) => handleArrayChange('importantContacts', idx, 'email', e.target.value)}
                />
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('importantContacts')}>
              + Add Contact
            </button>
          </>
        );


      case 'transfers':
        return (
          <>
            {formData.transfers.map((t, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3>Transfer {idx + 1}</h3>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem('transfers', idx)}
                    style={{ backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>

                <label>Model</label>
                <input type="text" value={t.model} onChange={(e) => handleArrayChange('transfers', idx, 'model', e.target.value)} />

                <label>Pickup</label>
                <input type="text" value={t.pickup} onChange={(e) => handleArrayChange('transfers', idx, 'pickup', e.target.value)} />

                <label>Chargeable</label>
                <select value={t.chargeable} onChange={(e) => handleArrayChange('transfers', idx, 'chargeable', e.target.value)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <label>One Way</label>
                <input type="text" value={t.oneWay} onChange={(e) => handleArrayChange('transfers', idx, 'oneWay', e.target.value)} />

                <label>Two Way</label>
                <input type="text" value={t.twoWay} onChange={(e) => handleArrayChange('transfers', idx, 'twoWay', e.target.value)} />
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('transfers')}>+ Add Transfer</button>
          </>
        );

      case 'touristInterest':
        return (
          <>
            {formData.touristInterest.map((place, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ margin: 0 }}>Place {idx + 1}</h4>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => removeItem('touristInterest', idx)}
                  >
                    Delete
                  </button>
                </div>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => {
                    const updated = [...formData.touristInterest];
                    updated[idx] = e.target.value;
                    setFormData(prev => ({ ...prev, touristInterest: updated }));
                  }}
                  placeholder="e.g., India Gate, Connaught Place"
                />
              </div>
            ))}
            <button
              type="button"
              className="add-btn"
              onClick={() => setFormData(prev => ({
                ...prev,
                touristInterest: [...prev.touristInterest, '']
              }))}
            >
              + Add Tourist Place
            </button>
          </>
        );


      case 'cardsAccepted':
        return (
          <>
            {formData.cardsAccepted.map((card, idx) => (
              <div
                key={idx}
                className="form-group"
                style={{
                  border: '1px solid #ccc',
                  padding: '1rem',
                  marginBottom: '1rem',
                  borderRadius: '6px',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h4 style={{ margin: 0 }}>Card {idx + 1}</h4>
                  <button type="button" className="delete-btn" onClick={() => removeItem('cardsAccepted', idx)}>
                    Delete
                  </button>
                </div>

                <div className="form-group horizontal">
                  <label>Card Type</label>
                  <input
                    type="text"
                    value={card.cardType}
                    onChange={(e) => handleArrayChange('cardsAccepted', idx, 'cardType', e.target.value)}
                  />

                  <label>Accepted</label>
                  <select
                    value={card.accepted}
                    onChange={(e) => handleArrayChange('cardsAccepted', idx, 'accepted', e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('cardsAccepted')}>+ Add Card</button>
          </>
        );



      case 'roomFacilities':
        return (
          <>
            {formData.roomFacilities.map((facility, idx) => (
              <div key={idx} className="form-group" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>Facility {idx + 1}</h4>
                  <button type="button" className="delete-btn" onClick={() => removeItem('roomFacilities', idx)}>Delete</button>
                </div>
                <label>Facility</label>
                <input
                  type="text"
                  value={facility.name}
                  onChange={(e) => handleArrayChange('roomFacilities', idx, 'name', e.target.value)}
                />
                <label>Availability</label>
                <select
                  value={facility.available}
                  onChange={(e) => handleArrayChange('roomFacilities', idx, 'available', e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <label>Complimentary</label>
                <select
                  value={facility.complimentary}
                  onChange={(e) => handleArrayChange('roomFacilities', idx, 'complimentary', e.target.value)}
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('roomFacilities')}>+ Add Facility</button>
          </>
        );


      case 'ratePlans':
        return (
          <>
            {formData.ratePlans.map((plan, idx) => (
              <div key={idx} className="form-group" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>Rate Plan {idx + 1}</h4>
                  <button type="button" className="delete-btn" onClick={() => removeItem('ratePlans', idx)}>Delete</button>
                </div>
                {Object.keys(plan).map((field, fidx) => (
                  <React.Fragment key={fidx}>
                    <label>{field}</label>
                    <input
                      type="text"
                      value={plan[field]}
                      onChange={(e) => handleArrayChange('ratePlans', idx, field, e.target.value)}
                    />
                  </React.Fragment>
                ))}
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('ratePlans')}>+ Add Rate Plan</button>
          </>
        );

      case 'fbOptions':
        return (
          <>
            {formData.fbOptions.map((fb, idx) => (
              <div key={idx} className="form-group" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4>F&B Option {idx + 1}</h4>
                  <button type="button" className="delete-btn" onClick={() => removeItem('fbOptions', idx)}>Delete</button>
                </div>
                <label>Restaurant Name</label>
                <input type="text" value={fb.name} onChange={(e) => handleArrayChange('fbOptions', idx, 'name', e.target.value)} />
                <label>Cuisine</label>
                <input type="text" value={fb.cuisine} onChange={(e) => handleArrayChange('fbOptions', idx, 'cuisine', e.target.value)} />
                <label>Type</label>
                <input type="text" value={fb.type} onChange={(e) => handleArrayChange('fbOptions', idx, 'type', e.target.value)} />
                <label>Timings</label>
                <input type="text" value={fb.timings} onChange={(e) => handleArrayChange('fbOptions', idx, 'timings', e.target.value)} />
                <label>Meals</label>
                <input type="text" value={fb.meals} onChange={(e) => handleArrayChange('fbOptions', idx, 'meals', e.target.value)} />
              </div>
            ))}
            <button type="button" className="add-btn" onClick={() => addItem('fbOptions')}>+ Add F&B Option</button>
          </>
        );


      default:
        return <p>Unknown section</p>;
    }
  };
  return (
    <div className="onboarding-form">
      <h1>Hotel Onboarding Form</h1>

      {/* Step Navigation Bar */}
      <div className="step-nav">
        {steps.map((step, index) => (
          <div
            key={step.key}
            className={`step-nav-item ${index === currentStepIndex ? 'active' : ''} ${completedSteps.includes(step.key) ? 'completed' : ''}`}
            onClick={() => setCurrentStepIndex(index)}
          >
            {step.label}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <form onSubmit={(e) => e.preventDefault()}>
        {renderStepSection()}

        <div style={{ marginTop: '1rem' }}>
          <button type="button" onClick={saveStepData} className="submit-btn">Save & Next</button>
          {currentStepIndex < steps.length - 1 && (
            <button type="button" onClick={goToNextStep} className="submit-btn" style={{ marginLeft: '10px' }}>
              Next
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default App;
