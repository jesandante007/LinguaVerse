import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useContext } from "react";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const SinglePayment = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const { data: singleClass } = useQuery({
    queryKey: ["bookings", id],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/bookings/${id}`);
      return res.data;
    },
  });
  const totalPrice = singleClass.price;
  
  return (
    <div className="w-full p-4 mx-auto">
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={totalPrice} singleClass={singleClass} />
      </Elements>
    </div>
  );
};

export default SinglePayment;
