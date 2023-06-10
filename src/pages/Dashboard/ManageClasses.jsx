import React, { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const ManageClasses = () => {
    const {user, loading} = useContext(AuthContext)
    const [axiosSecure] = useAxiosSecure()
    const {data: classes = [], refetch} = useQuery({

    })
    return (
        <div className="w-full max-w-5xl p-4">
        <p className="text-4xl font-medium text-center mb-8">Manage Classes</p>
        <div className="overflow-x-auto my-4 rounded">
          <table className="table table-zebra border border-gray-300 text-base">
            <thead>
              <tr className="text-base">
                <th>SL</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, i) => (
                <tr key={cls._id}>
                  <th>{i + 1}</th>
                  <td>{cls?.name}</td>
                  <td>{cls?.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default ManageClasses;