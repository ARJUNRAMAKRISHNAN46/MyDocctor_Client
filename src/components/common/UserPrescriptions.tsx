import Navbar from "./Navbar"

function UserPrescriptions() {
  return (
    <div>
      <Navbar/>
      <div>
        <h1 className="text-center font-semibold text-red-600">No prescription available</h1>
      </div>
    </div>
  )
}

export default UserPrescriptions
