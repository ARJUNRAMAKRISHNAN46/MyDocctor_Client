import Navbar from "./Navbar";

export default function UserBookings() {
  return (
    <div>
      <Navbar/>
      <div>
        <h1 className="text-center font-semibold text-red-600">No bookings yet</h1>
      </div>
    </div>
  )
}
