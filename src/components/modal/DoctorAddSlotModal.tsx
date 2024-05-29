import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addAppointment } from "../../redux/actions/AppointmentActions";

interface AddSlotModalProps {
  show: () => void;
  date: string;
}

const DoctorAddSlotModal: React.FC<AddSlotModalProps> = ({ show, date }) => {
  const userData = useSelector((state: RootState) => state.userData.user);
  const dispatch: AppDispatch = useDispatch();
  const [status, setStatus] = useState<boolean>(false);

  useEffect(() => {},[status])

  const validationSchema = Yup.object().shape({
    date: Yup.string(),
    consultationMethods: Yup.array().min(1, "At least one consultation method is required"),
    times: Yup.array().min(1, "At least one time slot is required"),
  });

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 9; hour < 17; hour++) {
      for (let min = 0; min < 60; min += 30) {
        const startTime = `${hour.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`;
        const displayTime = `${formatTime(startTime)}`;
        timeOptions.push(
          <label key={startTime} className="flex items-center font-semibold mt-2 text-sm">
            <Field type="checkbox" name="times" value={`${startTime}`} className="mr-2" />
            <div className="border border-green-400 text-green-500 text-sm px-4 rounded">{displayTime}</div>
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
    const formattedHour = parsedHour % 12 === 0 ? "12" : (parsedHour % 12).toString();
    return `${formattedHour}:${minute} ${amOrPm}`;
  };

  const calculateEndTime = (startTime: string) => {
    const [hour, minute] = startTime.split(":").map(Number);
    const endHour = minute === 30 ? hour + 1 : hour;
    const endMinute = minute === 30 ? 0 : 30;
    return `${endHour.toString().padStart(2, "0")}:${endMinute.toString().padStart(2, "0")}`;
  };

  return (
    <div className="container mx-auto py-2 bg-gray-700 rounded-[15px] w-[600px]">
      <Formik
        initialValues={{ doctorId: userData?._id, date, consultationMethods: [], times: [] }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          const { date, consultationMethods, times } = values;
          const slots = times.map((startTime) => ({
            start: startTime,
            end: calculateEndTime(startTime),
            userId: userData?._id || "",
          }));

          const appointmentData = {
            doctorId: userData?._id,
            date,
            consultationMethods: consultationMethods.map(method => method === 'inPerson' ? 'in-person' : method), // Ensure correct enum value
            slots,
          };

          dispatch(addAppointment(appointmentData)).then((res) => {
            console.log("🚀 ~ dispatch ~ res:", res);
            show();
            setStatus(true);
          });
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            <div className="mb-2">
              <div className="flex justify-between">
                <label htmlFor="date" className="block my-2 text-white font-bold">Date</label>
              </div>
              <Field
                type="text"
                id="date"
                name="date"
                className={`mt-1 p-2 block bg-gray-700 font-semibold text-green-500 text-sm w-full border border-green-400 rounded-[5px] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.date && touched.date ? "border-red-500" : ""
                }`}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFieldValue("date", e.target.value)}
              />
              <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-2">
              <label className="block font-bold text-white">Consultation Methods</label>
              <div className="flex items-center py-2 px-3 mt-2 text-green-500 font-semibold text-sm">
                <label className="mr-4 border border-green-400 px-6 rounded py-1">
                  <Field type="checkbox" name="consultationMethods" value="in-person" className="mr-2" />
                  In-Person
                </label>
                <label className="mr-4 border border-green-400 px-6 rounded py-1">
                  <Field type="checkbox" name="consultationMethods" value="phone" className="mr-2" />
                  Phone Call
                </label>
                <label className="border border-green-400 px-6 rounded py-1">
                  <Field type="checkbox" name="consultationMethods" value="video" className="mr-2" />
                  Video
                </label>
              </div>
              <ErrorMessage name="consultationMethods" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="slots" className="block text-white font-bold mb-2">Time Slots</label>
              <div className="grid grid-cols-4 mt-6 gap-2">
                {generateTimeOptions()}
              </div>
              <ErrorMessage name="slots" component="div" className="text-red-500 text-sm mt-1" />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="bg-green-500 text-white px-14 py-2 my-4 rounded-full hover:bg-green-600">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DoctorAddSlotModal;
