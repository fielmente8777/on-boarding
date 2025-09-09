import React, { useEffect, useState } from "react";
import { defaultFormData } from "../../constants/formData";

const roomFieldLabels = {
  roomType: "Room Type",
  roomName: "Room Name",
  roomSubheading: "Room Subheading",
  isWeekendFormat: "Is Weekend Format",
  changedPrice: "Changed Price",
  child: "Child",
  adult: "Adult",
  noOfRooms: "Number of Rooms",
  price: "Price",
  roomFacilities: "Room Facilities",
  roomDescription: "Room Description",
  roomImage: "Room Images",
};

const RoomOverview = ({
  formData,
  setFormData,
  currentStepIndex,
  goToNextStep,
  goToPrevStep,
  steps,
  saveStepData,
  currentStep,
}) => {
  // const [roomFormData, setRoomFormData] = useState([
  //   {
  //     id: 1,
  //     roomName: "",
  //     roomType: "",
  //     roomSubheading: "",
  //     isWeekendFormat: "",
  //     changedPrice: {
  //       weekend: 0,
  //       weekday: 0,
  //     },

  //     child: 0,
  //     adult: 0,
  //     noOfRooms: 0,
  //     price: 0,
  //     roomFacilities: [],
  //     roomDescription:
  //       "Embrace peacefulness and indulge in a serene retreat amidst the serene ambiance of Auroville.",
  //     roomImage: [],
  //   },
  // ]);

  const [roomFormData, setRoomFormData] = useState([]);

  const addRooms = () => {
    setRoomFormData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...roomFieldLabels,
      },
    ]);
  };

  const handleInputChange = (event, id) => {
    const { name, value } = event.target;
    const updatedData = roomFormData?.map((room) => {
      if (room.id === id) {
        return {
          ...room,
          [name]: value,
        };
      }
      return room;
    });
    setRoomFormData(updatedData);
  };

  const handleFileChange = (event, id) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const imageUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        imageUrls.push(file);
      }

      const updatedData = roomFormData?.map((room) => {
        if (room.id === id) {
          return {
            ...room,
            roomImage: imageUrls,
          };
        }
        return room;
      });

      setRoomFormData(updatedData);
    }
  };

  const handleRemoveRoomImage = (roomid, idx) => {};

  const nextStep = () => {
    setFormData((prev) => ({ ...prev, rooms: roomFormData }));
    const isEmpty = Object.values(roomFormData[0]).every(
      (value) => value === ""
    );

    // console.log(isEmpty);

    // if (isEmpty) {
    //   alert("Please fill in at least one field before continuing.");
    //   return;
    // }

    goToNextStep(roomFormData);
  };

  const prevStep = () => {
    setFormData((prev) => ({ ...prev, rooms: roomFormData }));
    goToPrevStep();
  };

  useEffect(() => {
    if (formData.rooms && formData.rooms.length > 0) {
      setRoomFormData(() => [...formData?.rooms]);
    } else {
      setRoomFormData(() => [
        {
          id: 1,
          roomName: "",
          roomType: "",
          roomSubheading: "",
          isWeekendFormat: "",
          changedPrice: {
            weekend: 0,
            weekday: 0,
          },

          child: 0,
          adult: 0,
          noOfRooms: 0,
          price: 0,
          roomFacilities: [],
          roomDescription:
            "Embrace peacefulness and indulge in a serene retreat amidst the serene ambiance of Auroville.",
          roomImage: [],
        },
      ]);
    }
  }, [formData]);

  console.log(roomFormData);

  return (
    <div>
      <div className="space-y-4">
        {roomFormData?.map((room, idx) => {
          return (
            <div className="">
              <hr className="mb-4" />

              <div className={`grid grid-cols-2 gap-4`}>
                {Object.keys(room).map((field, idx) => {
                  if (field === "id") return null;

                  if (field === "roomDescription")
                    return (
                      <div key={idx} className="col-span-full">
                        <textarea
                          type="text"
                          rows={6}
                          placeholder={roomFieldLabels[field]}
                          className="w-full p-4 outline-none bg-gray-100/60 border  focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                        />
                      </div>
                    );

                  if (field.toLocaleLowerCase() === "isweekendformat") {
                    return (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm">
                          <select
                            name=""
                            id=""
                            className="w-full outline-none h-full"
                          >
                            <option value="">
                              Select / {roomFieldLabels[field]}
                            </option>
                            <option value="">Yes</option>
                            <option value="">No</option>
                          </select>
                        </div>
                      </div>
                    );
                  }

                  if (
                    field.toLocaleLowerCase() === "child" ||
                    field.toLocaleLowerCase() === "adult"
                  ) {
                    const length =
                      field.toLocaleLowerCase() === "child" ? 3 : 5;
                    return (
                      <div key={idx} className="flex gap-4 items-center">
                        <div className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm">
                          <select
                            name=""
                            id=""
                            className="w-full outline-none h-full"
                          >
                            <option value="">
                              Select / {roomFieldLabels[field]}
                            </option>
                            {Array.from({ length }, (_, i) => i + 1).map(
                              (num) => (
                                <option key={num} value={num}>
                                  {num}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                      </div>
                    );
                  }

                  if (field.toLocaleLowerCase() === "roomimage") {
                    return (
                      <div
                        key={idx}
                        className="flex gap-4 items-center col-span-full"
                      >
                        <div className="w-full">
                          <input
                            type="file"
                            multiple
                            placeholder={roomFieldLabels[field]}
                            className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                            onChange={(e) => handleFileChange(e, room.id)}
                          />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div key={idx} className="flex gap-4 items-center">
                      <div className="w-full">
                        <input
                          type="text"
                          placeholder={roomFieldLabels[field]}
                          className="w-full p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                          onChange={(e) => handleInputChange(e, room.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* rooms images preview  */}
              {/* <div>
                {roomsImagesPreview[room.id] &&
                  roomsImagesPreview[room.id].length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      {roomsImagesPreview[room.id].map((image, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 items-cente relative"
                        >
                          <div className="w-full">
                            <img
                              src={image}
                              alt=""
                              className="w-full h-52 object-cover p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                            />
                          </div>

                          <span
                            className="size-5 absolute -top-1 -right-2 bg-red-500 text-white flex items-center justify-center rounded-full text-xs font-bold cursor-pointer"
                            onClick={() => handleRemoveRoomImage(room.id, idx)}
                          >
                            X
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div> */}

              <div>
                {Array.isArray(room.roomImage) &&
                  room?.roomImage &&
                  room?.roomImage?.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-6">
                      {room?.roomImage?.map((image, idx) => (
                        <div
                          key={idx}
                          className="flex gap-4 items-cente relative"
                        >
                          <div className="w-full">
                            <img
                              src={URL.createObjectURL(image)}
                              alt=""
                              className="w-full h-52 object-cover p-4 outline-none bg-gray-100/60 border focus:border-slate-500 border-gray-200 rounded-md shadow-sm"
                            />
                          </div>

                          <span
                            className="size-5 absolute -top-1 -right-2 bg-red-500 text-white flex items-center justify-center rounded-full text-xs font-bold cursor-pointer"
                            onClick={() => handleRemoveRoomImage(room.id, idx)}
                          >
                            X
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="add-btn"
        // onClick={() => addItem("rooms")}
        onClick={addRooms}
      >
        + Add Room
      </button>

      <div className="flex gap-4 items-center">
        <button
          disabled={currentStepIndex === 0}
          type="button"
          onClick={prevStep}
          className={`submit-btn ${
            currentStepIndex === 0 ? "opacity-50 bg-black" : "cursor-pointer"
          }`}
        >
          Prev
        </button>

        {currentStepIndex < steps.length - 1 && (
          <button type="button" onClick={nextStep} className="submit-btn">
            Next
          </button>
        )}

        {(currentStep === currentStepIndex) === steps.length - 1 ? (
          <button
            type="submit"
            // onClick={saveStepData}
            className="submit-btn"
          >
            Submit
          </button>
        ) : (
          <button type="button" onClick={saveStepData} className="submit-btn">
            Save & Next
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomOverview;

/* {roomFormData.map((room, idx) => (
        <div
          key={idx}
          className="room-entry"
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
            <h3>Room {idx + 1}</h3>
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeItem("rooms", idx)}
              style={{
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
          {Object.keys(room).map((field, fidx) => {
            return (
              <div key={fidx} className="form-group">
                <label>{field}</label>
                <input
                  type="text"
                  value={room[field]}
                  onChange={(e) =>
                    handleChange("rooms", idx, field, e.target.value)
                  }
                />
              </div>
            );
          })}
        </div>
      ))} */
