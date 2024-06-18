import { useDispatch, useSelector } from "react-redux";
import { listPayments } from "../../redux/actions/PaymentActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { PaymentEntity } from "../../types/Payment";

const DoctorPayments = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [payments, setPayments] = useState<PaymentEntity[]>([]);
  console.log("🚀 ~ DoctorPayments ~ payments:", payments);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listPayments(userData?._id)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res)
      setPayments(res.payload?.data || []);
    });
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-[30px] text-white px-5">Payments</h1>
        <div className="flex justify-center mt-4">
          <div className="flex">
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[60px]">
              Sl.No
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[300px]">
              User ID
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[300px]">
              Payment ID
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[100px]">
              Amount
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[200px]">
              Payment Date
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[200px]">
              Booking Date
            </h1>
            <h1 className="text-center border-2 italic py-3 font-bold border-gray-500 w-[100px]">
              Time Slot
            </h1>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="h-[65vh]">
            {currentPayments.map((payment: PaymentEntity, index: number) => (
              <div className="flex" key={payment._id}>
                <div className="border border-gray-500 text-center italic py-2 w-[60px]">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[300px]">
                  {payment.user_id}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[300px]">
                  {payment.user_id}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[100px]">
                  {payment.fees}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[200px]">
                  {formatDate(String(payment?.createdAt))}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[200px]">
                  {payment.date}
                </div>
                <div className="border border-gray-500 text-center italic py-2 w-[100px]">
                  {payment.slot}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1 ? "bg-gray-500" : "bg-gray-600"
              } text-white rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorPayments;

//STARTER CODE FOR DOCTOR PAYMENT

// import { useDispatch, useSelector } from "react-redux";
// import { listPayments } from "../../redux/actions/PaymentActions";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useEffect, useState } from "react";
// import { PaymentEntity } from "../../types/Payment";

// const DoctorPayments = () => {
//   const dispatch: AppDispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.userData.user);
//   const [payments, setPayments] = useState<PaymentEntity[]>();
//   useEffect(() => {
//     dispatch(listPayments(userData?._id)).then((res) => {
//       setPayments(res.payload?.data);
//     });
//   }, [dispatch]);

//   return (
//     <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
//       <div className=" bg-gray-800 w-[82vw] h-[96vh] overflow-scroll">
//         <h1 className="font-bold text-[30px] text-white">Payments</h1>
//         <div className="">
//           {payments?.map((payment: PaymentEntity) => (
//             <div className="flex justify-between">
//               <h1>{payment?.fees}</h1>
//               <h1>{payment?.date}</h1>
//               <h1>{payment?.user_id}</h1>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorPayments;
