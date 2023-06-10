import React, { useContext, useEffect, useState } from "react";
import "./CheckoutForm.css";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ totalPrice, myClasses, singleClass }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState();
  const [clientSecret, setClientSecret] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-secret", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }

    // confirm card payment
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "unknown",
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      setCardError(error.message);
    }
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      if (myClasses) {
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          totalPrice,
          date: new Date(),
          classes: myClasses.map((cls) => cls.classId),
          bookings: myClasses.map((cls) => cls._id),
          classNames: myClasses.map((cls) => cls.name),
        };
        axiosSecure.post("/payments", payment).then((res) => {
          console.log(res.data);
          if (res.data.insertResult.insertedId) {
            toast.success("Payment Successful");
          }
        });
      }
      if (singleClass) {
        const payment = {
          email: user?.email,
          transactionId: paymentIntent.id,
          totalPrice,
          date: new Date(),
          classId: singleClass.classId,
          bookingId: singleClass._id,
          classNames: singleClass.name,
        };
        axiosSecure.post("/singlePayments", payment).then((res) => {
          console.log(res.data);
          if (res.data.insertResult.insertedId) {
            toast.success("Payment Successful");
          }
        });
      }
    }
  };

  return (
    <div className="">
      <form className="max-w-5xl" onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn bg-blue-500 hover:bg-blue-700 text-white"
          type="submit"
          disabled={!stripe || processing || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-error">{cardError}</p>}
      {transactionId && (
        <p className="text-success">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
    </div>
  );
};

export default CheckoutForm;
