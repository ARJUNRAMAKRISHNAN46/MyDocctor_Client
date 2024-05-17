import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export const DoctorAddSlotModal = (closeModal: any) => {
  console.log("🚀 ~ DoctorAddSlotModal ~ closeModal:", closeModal)
  const initialValues = {
    selectedDate: "",
    selectedSlot: "",
    selectedMethod: "",
    startTime: "",
  };

  const validationSchema = Yup.object().shape({
    selectedDate: Yup.date()
      .required("Date is required")
      .min(new Date(), "Please select a future date"),
    selectedSlot: Yup.string().required("Slot is required"),
    startTime: Yup.string().required("Start time is required"),
    selectedMethod: Yup.string().required("Method is required"),
  });

  const getAvailableTimes = (selectedSlot: any) => {
    switch (selectedSlot) {
      case "morning":
        return { startTime: "09:00"};
      case "afternoon":
        return { startTime: "12:00"};
      case "evening":
        return { startTime: "15:00"};
      default:
        return { startTime: ""};
    }
  };

  const convertTo12HourFormat = (time: any) => {
    const [hours, minutes] = time.split(":");
    let period = "AM";
    let hour = parseInt(hours, 10);
    if (hour > 12) {
      hour -= 12;
      period = "PM";
    }
    return `${hour}:${minutes} ${period}`;
  };

  return (
    <div className="max-w-md mx-auto my-8 p-8 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-4">Select Doctor Availability</h2>
        <h2 onClick={closeModal?.close} className="text-2xl font-bold mb-4">X</h2>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            values.startTime = convertTo12HourFormat(values.startTime);
           
            console.log(values.startTime);

            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form>
            <div className="mb-4">
              <label
                htmlFor="selectedDate"
                className="block text-sm font-medium text-gray-700"
              >
                Select Date:
              </label>
              <Field
                type="date"
                name="selectedDate"
                id="selectedDate"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
              <ErrorMessage
                name="selectedDate"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="selectedSlot"
                className="block text-sm font-medium text-gray-700"
              >
                Select Slot:
              </label>
              <Field
                as="select"
                name="selectedSlot"
                id="selectedSlot"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
                onChange={(e:any) => {
                  setFieldValue("selectedSlot", e.target.value);
                  const { startTime} = getAvailableTimes(
                    e.target.value
                  );
                  setFieldValue("startTime", startTime);
                }}
              >
                <option value="">Select Slot</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
              </Field>
              <ErrorMessage
                name="selectedSlot"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="startTime"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time:
              </label>
              <Field
                type="time"
                name="startTime"
                id="startTime"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              />
              <ErrorMessage
                name="startTime"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            
            <div className="mb-4">
              <label
                htmlFor="selectedMethod"
                className="block text-sm font-medium text-gray-700"
              >
                Select Method:
              </label>
              <Field
                as="select"
                name="selectedMethod"
                id="selectedMethod"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200"
              >
                <option value="">Select Method</option>
                <option value="in-person">In-person</option>
                <option value="phone">Phone</option>
                <option value="video">Video</option>
              </Field>
              <ErrorMessage
                name="selectedMethod"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
