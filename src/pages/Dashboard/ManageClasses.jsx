import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheck, FaTimes } from "react-icons/fa";

const ManageClasses = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: classes = [], refetch } = useQuery({
    queryKey: [],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure("/ManageClasses");
      return res.data;
    },
  });

  const handleApprove = cls => {

  }

  const handleDeny = cls => {

  }

  return (
    <div className="w-full max-w-5xl p-4">
      <p className="text-4xl font-medium text-center mb-8">Manage Classes</p>
      <div className="overflow-x-auto my-4 border border-gray-300 rounded">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Email</th>
              <th>
                Available <br /> Seats
              </th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>
                Send <br /> Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls, i) => (
              <tr key={cls._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center space-x-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-14 h-14">
                        <img src={cls?.image} alt="class image" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{cls?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{cls?.instructor}</td>
                <td>{cls?.email}</td>
                <td>{cls?.availableSeats}</td>
                <td>{cls?.price}</td>
                <td>{cls?.status}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => handleApprove(cls)} className="btn btn-square btn-success btn-outline btn-sm">
                      <FaCheck size={20} />
                    </button>
                    <button onClick={() => handleDeny(cls)} className="btn btn-square btn-error btn-sm btn-outline">
                     <FaTimes size={20} />
                    </button>
                  </div>
                </td>
                <td>
                  <button className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white normal-case">
                    Write
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
