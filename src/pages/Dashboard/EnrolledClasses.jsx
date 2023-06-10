import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const EnrolledClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: enrolls = [] } = useQuery({
    queryKey: ["enrolls"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/enrolls/${user?.email}`);
      return res.data;
    },
  });
  return (
    <div className="w-full max-w-5xl p-4">
      <p className="text-4xl font-medium text-center mb-8">Enrolled Classes</p>
      <div className="overflow-x-auto my-4 border border-gray-300 rounded">
        <table className="table table-zebra text-base">
          <thead>
            <tr className="text-base">
              <th>SL</th>
              <th>Class</th>
              <th>Instructor</th>
              <th>Price $</th>
            </tr>
          </thead>
          <tbody>
            {enrolls.map((cls, i) => (
              <tr key={cls._id}>
                <th>{i + 1}</th>
                <td>{cls.name}</td>
                <td>{cls.instructor}</td>
                <td>{cls.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EnrolledClasses;
