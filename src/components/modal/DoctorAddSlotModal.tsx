// DoctorAppointmentScheduler.tsx
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddSlotModalProps {
  show: boolean;
  handleClose: () => void;
}

const DoctorAddSlotModal: React.FC<AddSlotModalProps> = ({
  show,
  handleClose,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const validationSchema = Yup.object().shape({
    date: Yup.date().required("Date is required"),
    consultationMethods: Yup.array().min(
      1,
      "At least one consultation method is required"
    ),
    times: Yup.array().min(1, "At least one time slot is required"),
  });

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const startTime = `${hour.toString().padStart(2, "0")}:${min
          .toString()
          .padStart(2, "0")}`;
        const endTime = `${(hour + (min === 30 ? 1 : 0))
          .toString()
          .padStart(2, "0")}:${min === 30 ? "00" : "30"}`;
        const displayTime = `${formatTime(startTime)} - ${formatTime(endTime)}`;
        timeOptions.push(
          <label
            key={startTime}
            className="flex items-center font-semibold text-sm italic"
          >
            <Field
              type="checkbox"
              name="times"
              value={`${startTime}-${endTime}`}
              className="mr-2"
            />
            {displayTime}
          </label>
        );
      }
    }
    return timeOptions;
  };

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const parsedHour = parseInt(hour);
    const amOrPm = parsedHour >= 12 ? "PM" : "AM";
    const formattedHour =
      parsedHour % 12 === 0 ? "12" : (parsedHour % 12).toString();
    return `${formattedHour}:${minute} ${amOrPm}`;
  };

  return (
    <div className="w-[84vw] h-[150vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] flex justify-center items-center h-[146vh]">
        <div className="container mx-auto py-2 bg-white rounded-[15px] w-[400px]">
          {/* <h1 className="text-xl font-bold text-center text-blue-700 mb-4">Doctor Appointment Scheduler</h1> */}
          <Formik
            initialValues={{ date: "", consultationMethods: [], times: [] }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              handleClose();
              // Handle form submission here (e.g., save to database)
              console.log(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="mb-2">
                  <div className="flex justify-between">
                  <label
                    htmlFor="date"
                    className="block font-bold"
                  >
                    Date:
                  </label>
                  <span onClick={() => handleClose()} className="text-xl font-semibold">X</span>
                  </div>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    min={tomorrow.toISOString().split("T")[0]}
                    className={`mt-1 p-2 block italic font-semibold text-sm w-full border-2 border-gray-300 rounded-[5px] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                      errors.date && touched.date ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-2">
                  <label className="block font-bold">
                    Consultation Methods:
                  </label>
                  <div className="flex items-center border-2 py-2 px-3 border-gray-300 mt-2 font-semibold text-sm italic">
                    <label className="mr-4">
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="inPerson"
                        className="mr-2"
                      />
                      In-Person
                    </label>
                    <label className="mr-4">
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="phoneCall"
                        className="mr-2"
                      />
                      Phone Call
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="video"
                        className="mr-2"
                      />
                      Video
                    </label>
                  </div>
                  <ErrorMessage
                    name="consultationMethods"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="times"
                    className="block font-bold mb-2"
                  >
                    Time Slots:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {generateTimeOptions()}
                  </div>
                  <ErrorMessage
                    name="times"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-14 py-2 rounded-full hover:bg-blue-600"
                  >
                    Submit
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default DoctorAddSlotModal;
