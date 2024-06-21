import BarChart from "../Dashboard/admin/BarChart"
import HeaderStats from "../Dashboard/admin/HeaderStats"
import LineChart from "../Dashboard/admin/LineChart"
import ListDoctors from "../Dashboard/admin/ListDoctors"
import ListPatients from "../Dashboard/admin/ListPatients"

function AdminDashboard() {
  return (
    <div className="w-[84vw] h-[180vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[176vh] px-8">
        <HeaderStats />
        <div className="md:flex md:justify-between md:mt-5 grid">
          <LineChart />
          <BarChart />
        </div>
        <ListDoctors />
        <ListPatients />
      </div>
    </div>
  )
}

export default AdminDashboard
