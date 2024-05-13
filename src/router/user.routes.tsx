import { Suspense, lazy } from "react";
import PrivateRoute from "./privateroute";
import Loader from "../components/common/Loader";

const SlotBooking = lazy(() => import("../pages/user/SlotBooking"));

export default function UserRoutes() {
  return (
    <Suspense fallback={<Loader />}>
        <PrivateRoute
          path="select-slot/:id"
          element={<SlotBooking />}
          role="user"
        />
    </Suspense>
  );
}
