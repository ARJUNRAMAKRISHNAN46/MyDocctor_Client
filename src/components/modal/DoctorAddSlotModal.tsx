import { Formik, Field, FieldArray, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { addAppointment } from "../../redux/actions/AppointmentActions";
import { AppointmentEntity } from "../../types/AddAppoinment";
import { UserData } from "../../types/userData";

interface AddSlotModalProps {
  show: boolean;
  handleClose: () => void;
}

const AddSlotModal: React.FC<AddSlotModalProps> = ({ show, handleClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const userData: UserData = useSelector(
    (state: RootState) => state.userData.user?._id
  );
  console.log("🚀 ~ AddSlotModal ~ userData:", userData);
  const initialValues: AppointmentEntity = {
    _id: "",
    date: "",
    consultationMethods: [],
    slots: [{ start: "", end: "", userId: "" }],
    doctorId: String(userData),
  };

  const validationSchema = Yup.object({
    date: Yup.string()
      .matches(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format")
      .required("Date is required"),
    consultationMethods: Yup.array().min(1, "At least one method is required"),
    slots: Yup.array().of(
      Yup.object({
        start: Yup.string().required("Start time is required"),
        end: Yup.string().required("End time is required"),
      })
    ),
  });

  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${show ? "" : "hidden"}`}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full p-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values, "values");
              dispatch(addAppointment(values));
              handleClose();
            }}
          >
            {({ values, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700">Date</label>
                  <Field
                    name="date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    placeholder="DD-MM-YYYY"
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Consultation Methods
                  </label>
                  <div className="flex space-x-4">
                    <label>
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="in-person"
                      />
                      In-person
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="phone"
                      />
                      Phone
                    </label>
                    <label>
                      <Field
                        type="checkbox"
                        name="consultationMethods"
                        value="video"
                      />
                      Video
                    </label>
                  </div>
                  <ErrorMessage
                    name="consultationMethods"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
                <Field
                  type="text"
                  name="doctorId"
                  value={userData}
                />
                <FieldArray name="slots">
                  {({ push, remove }) => (
                    <div>
                      <label className="block text-gray-700">Slots</label>
                      {values.slots.map((slot: any, index: any) => (
                        <div
                          key={index}
                          className="flex space-x-2 items-center mb-2"
                        >
                          {slot}
                          <Field
                            name={`slots[${index}].start`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Start Time"
                          />
                          <Field
                            name={`slots[${index}].end`}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="End Time"
                          />
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-600"
                          >
                            Remove
                          </button>
                          <ErrorMessage
                            name={`slots[${index}].start`}
                            component="div"
                            className="text-red-600 text-sm"
                          />
                          <ErrorMessage
                            name={`slots[${index}].end`}
                            component="div"
                            className="text-red-600 text-sm"
                          />
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => push({ start: "", end: "" })}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Add Slot
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                  >
                    Add Slot
                  </button>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddSlotModal;
