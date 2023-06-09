import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: myClasses = [] } = useQuery({
    queryKey: ["bookings", "myClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/bookings/myClasses/${user?.email}`);
      return res.data;
    },
  });
  const total = myClasses.reduce((sum, cls) => sum + cls.price, 0);
  const totalPrice = parseFloat(total.toFixed(2));
  return (
    <div className="w-full p-4 mx-auto">
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} myClasses={myClasses} />
      </Elements>
    </div>
  );
};

export default Payment;
