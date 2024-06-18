import BarChart from "../Dashboard/BarChart";
import HeaderStats from "../Dashboard/HeaderStats";
import LineChart from "../Dashboard/LineChart";
import ListPatients from "../Dashboard/ListPatients";

function DoctorOverview() {
  return (
    <div className="w-[84vw] h-[150vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[146vh] px-8">
        <HeaderStats />
        <div className="md:flex md:justify-between md:mt-5 grid">
          <LineChart />
          <BarChart />
        </div>
        <ListPatients/>
      </div>
    </div>
  );
}

export default DoctorOverview;
