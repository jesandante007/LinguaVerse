import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentHistory = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/payments/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="w-full max-w-5xl p-4">
      <p className="text-4xl font-medium text-center mb-8">
        Your Payment History
      </p>
      <div className="overflow-x-auto my-4 border border-gray-300 rounded">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Classes</th>
              <th>TransactionId</th>
              <th>Date</th>
              <th>Amount $</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, i) => (
              <tr key={pay._id}>
                <th>{i + 1}</th>
                <td>
                  {Array.isArray(pay.classNames)
                    ? pay.classNames.map((name) => (
                        <span key={name}>{name}, </span>
                      ))
                    : pay.classNames}
                </td>
                <td>{pay.transactionId}</td>
                <td>
                  {new Date(pay.date).toLocaleString("en-US", {
                    timeZone: "UTC",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td>{pay.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
