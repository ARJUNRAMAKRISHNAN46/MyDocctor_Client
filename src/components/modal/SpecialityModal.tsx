import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function SpecialityModal({ isOpen, onClose }) {
  const initialValues = {
    specialtyName: "",
    specialtyImage: null,
    specialtyDescription: "",
  };

  const validationSchema = Yup.object().shape({
    specialtyName: Yup.string().required("Please add a speciality"),
    specialtyImage: Yup.mixed().required("Please add speciality image"),
    specialtyDescription: Yup.string().required(
      "Please add speciality description"
    ),
  });

  const handleSubmit = (values: any, { setSubmitting }) => {
    console.log(values);

    setSubmitting(false);
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="bg-gray-800 p-8 z-10 rounded-[5px]">
        <div className="flex justify-between">
          <h2 className="text-xl text-white font-semibold mb-4">
            Add Specialty
          </h2>
          <h1 onClick={handleModalClose} className="text-white text-xl font-semibold cursor-pointer">X</h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Specialty Name:
                </label>
                <Field
                  type="text"
                  name="specialtyName"
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="specialtyName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Specialty Image:
                </label>
                <Field
                  type="file"
                  name="specialtyImage"
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="specialtyImage"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Specialty Description:
                </label>
                <Field
                  as="textarea"
                  name="specialtyDescription"
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="specialtyDescription"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Adding Specialty..." : "Add Specialty"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SpecialityModal;
