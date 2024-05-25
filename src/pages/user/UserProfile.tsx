import { useSelector } from "react-redux";
import { UserData } from "../../types/userData";
import { RootState } from "../../redux/store";
function UserProfile() {
  const userData: UserData = useSelector(
    (state: RootState) => state.userData.user
  );
  return (
    <div>
      <div className="h-[100vh] bg-white">hello</div>
    </div>
  );
}

export default UserProfile;
