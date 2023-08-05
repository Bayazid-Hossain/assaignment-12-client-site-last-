import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const usePayment = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem("access-token");
  // console.log(users.email);
  const { refetch, data: payment = [] } = useQuery({
    queryKey: ["payment", user?.email],
    enabled:
      !loading && !!user?.email && !!localStorage.getItem("access-token"),
    queryFn: async () => {
      const res = await fetch(
        `https://wonder-server-eight.vercel.app/payment?email=${user?.email}`,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  return [payment, refetch];
};

export default usePayment;
