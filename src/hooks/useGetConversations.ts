import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserData } from "../types/userData";

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<UserData[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data: UserData[] = await res.json();
        console.log("🚀 ~ getConversations ~ data:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        setConversations(data);
        console.log("🚀 ~ useGetConversations ~ conversations:", data);
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
