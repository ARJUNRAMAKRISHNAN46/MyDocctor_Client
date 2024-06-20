import DatePicker from "./Slots/DateListing";

const DoctorSlots = () => {
  return (
    <div>
      <div className="w-[84vw] h-[120vh] bg-gray-700 flex justify-center items-center">
        <div className="bg-gray-800 w-[82vw] h-[116vh]">
          <DatePicker />
        </div>
      </div>
    </div>
  );
};

export default DoctorSlots;
