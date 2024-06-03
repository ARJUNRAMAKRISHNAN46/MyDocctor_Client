import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Conversation {
  _id: string;
  name: string;
}

interface ApiResponse {
  error?: string;
  conversations?: Conversation[];
}

const useGetConversations = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/users");
        const data: ApiResponse = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }

        if (data.conversations) {
          setConversations(data.conversations);
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
