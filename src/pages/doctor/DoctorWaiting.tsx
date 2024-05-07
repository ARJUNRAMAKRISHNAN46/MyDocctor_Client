import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { LogoutUser } from "../../redux/actions/UserActions";

function DoctorWaiting() {
  const dispatch: AppDispatch = useDispatch();
  const handleClick = () => {
    try {
      dispatch(LogoutUser())
        .then((res) => {
          console.log("🚀 ~ logout ~ dispatch ~ res:", res);
        })
        .catch((err) => {
          console.log("🚀 ~ logout ~ dispatch ~ err:", err);
        });
    } catch (error) {
      console.log("🚀 ~ handleClick ~ error:", error);
    }
  };
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
      <div className="">
        <div className="flex justify-center items-center px-4 md:px-0">
          <h1 className="text-2xl text-green-600 font-bold">
            After admin verification, you are redirected to your dashboard
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <img src="../../../src/assets/waiting.png" alt="" />
        </div>
        <div className="w-[100vw] flex justify-center pr-6">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white font-semibold px-6 py-1 rounded-[5px]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorWaiting;
