import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { AppDispatch } from "../../redux/store";
import { addService } from "../../redux/actions/UserActions";
import { imageUpload } from "../../utils/UploadImage";
import { AddService } from "../../types/userData";

interface SpecialityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ServiceModal: React.FC<SpecialityModalProps> = ({ isOpen, onClose }) => {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: AddService = {
    serviceName: "",
    serviceImage: "",
    serviceDescription: "",
  };

  const validationSchema = Yup.object().shape({
    serviceName: Yup.string().required("Please add a service"),
    serviceImage: Yup.mixed().required("Please add service image"),
    serviceDescription: Yup.string().required("Please add service description"),
  });

  const showPreview = (previewId: string, file: Blob) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const preview = document.getElementById(previewId);
      if (preview instanceof HTMLElement) {
        preview.innerHTML = "";
        const img = document.createElement("img");

        img.src = String(reader.result);
        img.className = "w-20 h-20 rounded-full";
        preview.appendChild(img);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (
    values: AddService,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const specImage = await imageUpload(values.serviceImage);
    values.serviceImage = specImage;
    dispatch(addService(values))
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
    setSubmitting(false);
    onClose();
  };

  const handleModalClose = () => {
    onClose();
  };

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
            Add Service
          </h2>
          <h1
            onClick={handleModalClose}
            className="text-white text-xl font-semibold cursor-pointer"
          >
            X
          </h1>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps: FormikProps<AddService>) => (
            <Form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Service Name:
                </label>
                <Field
                  type="text"
                  name="serviceName"
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="serviceName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Service Image:
                </label>
                <input
                  type="file"
                  name="serviceImage"
                  onChange={(event) => {
                    if (event.currentTarget.files) {
                      formikProps.setFieldValue(
                        "serviceImage",
                        event.currentTarget.files[0]
                      );
                      showPreview(
                        "serviceImage",
                        event.currentTarget.files[0]
                      );
                    }
                  }}
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="serviceImage"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">
                  Service Description:
                </label>
                <Field
                  as="textarea"
                  name="serviceDescription"
                  className="border border-gray-300 rounded w-full py-2 px-3 bg-gray-800 text-gray-300"
                />
                <ErrorMessage
                  name="serviceDescription"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-800"
              >
                Add Service
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ServiceModal;
