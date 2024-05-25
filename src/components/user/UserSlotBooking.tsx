import { availableShift } from "../../util/SlotDatas";

function UserSlotBooking() {
  return (
    <div>
      <div>
        {availableShift.map((shift, index) => (
          <div key={index}>
            <h3>{shift.date}</h3>
            {shift.shifts.map((shiftItem, shiftIndex) => (
              <div key={shiftIndex}>
                <h4>{shiftItem.shift}</h4>
                <ul>
                  {shiftItem.slots.map((slot, slotIndex) => (
                    <li key={slotIndex}>
                      {slot.time} - {slot.status}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserSlotBooking;
