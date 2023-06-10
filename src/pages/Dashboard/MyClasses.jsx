import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: myClasses = [] } = useQuery({
    queryKey: ["classes", "myClasses"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/classes/${user?.email}`);
      return res.data;
    },
  });

  return (
    <div className="w-full max-w-5xl p-4">
      <p className="text-4xl font-medium text-center mb-8">My Added Classed</p>
      <div className="overflow-x-auto my-4 border border-gray-300 rounded">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Class</th>
              <th>Enrolled Students</th>
              <th>Status</th>
              <th>Feedback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myClasses.map((cls, i) => (
              <tr key={cls._id}>
                <th>{i + 1}</th>
                <td>{cls.name}</td>
                <td>{cls.seats - cls.availableSeats}</td>
                <td>{cls.status}</td>
                <td>{cls?.feedback}</td>
                <td>
                  <Link to={`/dashboard/updateClass/${cls._id}`}>
                    <button className="btn btn-sm bg-blue-500 hover:bg-blue-700 text-white normal-case">
                      Update
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyClasses;
