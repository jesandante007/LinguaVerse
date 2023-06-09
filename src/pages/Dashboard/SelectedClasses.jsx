import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const SelectedClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  
  const { data: myClasses = [], refetch } = useQuery({
    queryKey: ["bookings", "myClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/bookings/myClasses/${user?.email}`);
      return res.data;
    },
  });
  const total = myClasses.reduce((sum, cls) => sum + cls.price, 0);
  const totalPrice = parseFloat(total.toFixed(2));

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/bookings/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your class has been deleted.", "success");
          }
        });
      }
    });
  };
  return (
    <div className="w-full max-w-5xl p-4">
      <p className="text-4xl font-medium text-center mb-8">Selected Classes</p>
      <div className="overflow-x-auto my-4 rounded">
        <table className="table table-zebra border border-gray-300 text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Price $</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myClasses.map((cls, i) => (
              <tr key={cls._id}>
                <th>{i + 1}</th>
                <td>{cls.name}</td>
                <td>{cls.instructor}</td>
                <td>{cls.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(cls._id)}
                    className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white normal-case"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="text-base">
              <th></th>
              <th></th>
              <th></th>
              <th className="text-gray-900">Total: {totalPrice}</th>
              <th>
                <Link to="/dashboard/payment" state={totalPrice}>
                  <button className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white">
                    Pay
                  </button>
                </Link>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SelectedClasses;
