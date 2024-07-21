import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

function PaymentSuccess() {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.authData.user);

  const storedBookingData = localStorage.getItem("bookingData");

  if (storedBookingData) {
    const savePayment = async () => {
      const bookingData = JSON.parse(storedBookingData);
      console.log(
        bookingData,
        "------------------------------------------------------>>>>"
      );
      await axios
        .post("https://mydocctor.online/api/payments/save-payment", bookingData)
        .then((res) => {
          console.log(
            res.data?.data,
            "payment sucess data============================================//////"
          );
          // bookingData
        });

      axios.post(
        "https://mydocctor.online/api/appointment/update-appoinment",
        bookingData
      ).then((res) => {
        console.log("🚀 ~ ).then ~ res:", res)
        
      })
    };
    savePayment();
    const sendMail = async () => {
      try {
        const response = await axios.post(
          "https://mydocctor.online/api/notification/mail/send-mail",
          {
            email: userData?.email,
            message: "Appointment Booked Successfully",
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error sending email:", error);
      }
    };
    sendMail();
  } else {
    console.log("No booking data found in localStorage.");
  }

  const goToHome = () => {
    navigate("/");
  };
  return (
    <div>
      <div className="bg-gray-100 h-screen">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank you for completing your secure online payment.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <button
                onClick={goToHome}
                className="px-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-full"
              >
                GO BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentSuccess;
