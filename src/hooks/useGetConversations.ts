import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../types/userData";
import {
  listDoctorsForSideBar,
  listUserForSideBar,
} from "../redux/actions/AppointmentActions";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";

const useGetConversations = (userType: string) => {
  console.log("🚀 ~ useGetConversations ~ demo:", userType);
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<UserData[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.user);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        if (userType === "doctor") {
          dispatch(listUserForSideBar(userData?._id)).then((res) => {
            console.log("🚀 ~ dispatch ~ res:", res);
            console.log("🚀 ~ dispatch ~ res.payload:", res.payload);

            setConversations(res.payload?.data);
          });
        } else if (userType === "user") {
          console.log(userData?._id,"userdata.id");
          
          dispatch(listDoctorsForSideBar(userData?._id)).then((res) => {
            console.log("🚀 ~ dispatch ~ res:", res)
            setConversations(res.payload?.data);
          });
          // const res = await fetch("/api/users/doctors");
          // const data: UserData[] = await res.json();
          // console.log("🚀 ~ getConversations ~ data:", data);

          // if (!Array.isArray(data)) {
          //   throw new Error("Invalid data format");
          // }

          // console.log("🚀 ~ useGetConversations ~ conversations:", data);
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
