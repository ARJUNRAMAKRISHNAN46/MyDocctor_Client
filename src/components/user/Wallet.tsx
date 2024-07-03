import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { UserData } from "../../types/userData";
import { useDispatch, useSelector } from "react-redux";
import { walletHistory } from "../../redux/actions/AppointmentActions";
import { WalletData } from "../../types/Wallet";

const Wallet = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [wallet, setWallet] = useState<WalletData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userData: UserData = useSelector(
    (state: RootState) => state.authData.user
  );

  useEffect(() => {
    dispatch(walletHistory(String(userData?._id))).then((res) => {
      setWallet(res.payload.data);
    });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentWallets = wallet?.slice(indexOfFirstItem, indexOfLastItem);
  console.log("🚀 ~ Wal ~ currentWallets:", currentWallets);

  const totalPages = Math.ceil(wallet?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white h-[100vh] flex justify-center items-center">
      <div className="w-[82vw] h-[96vh]">
        <div className="flex justify-center">
          <div>
            <div className="flex text-gray-700 text-sm mt-6">
              <div className="text-center border-y border-gray-400 py-4 w-[60px]">
                <h1 className="font-bold">Sl.No</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Amount</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[300px]">
                <h1 className="font-bold">Reason</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Date</h1>
              </div>
              {/* <div className="text-center border-y border-gray-400 py-4 w-[200px]">
              <h1 className="font-bold">Time</h1>
            </div>
            <div className="text-center border-y border-gray-400 py-4 w-[200px]">
              <h1 className="font-bold">Action</h1>
            </div> */}
            </div>
            {currentWallets?.map((wallet: any, id: number) => (
              <div
                className="flex text-gray-700 text-sm"
                key={wallet.appointmentId + id}
              >
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[60px]">
                  <h1 className="">
                    {(currentPage - 1) * itemsPerPage + id + 1}
                  </h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                  <h1 className="">{wallet.amount}/-</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[300px]">
                  <h1 className="">{wallet.reason}</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                  <h1 className="">{wallet.date}</h1>
                </div>
                {/* <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                <h1 className="">{appointment.time}</h1>
              </div> */}
                {/* <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                <button
                  onClick={() => cancelAppointment(appointment.appId)}
                  className="bg-red-600 rounded text-white px-6 py-0.5"
                >
                  cancel
                </button>
              </div> */}
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)]?.map((_, index) => (
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
      </div>
    </div>
  );
};

export default Wallet;
