import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const UpdateClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const [classData, setClassData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const id = location.pathname.split("/")[3];

  useEffect(() => {
    axiosSecure(`/myClasses/${id}?email=${user?.email}`).then((res) =>
      setClassData(res.data)
    );
  }, [user]);

  const onSubmit = (data) => {
    const { availableSeats, email, image, instructor, name, price } = data;
    let imageUrl;
    if (image.length > 0) {
      const formData = new FormData();
      formData.append("image", image[0]);
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_KEY
      }`;
      axios.post(url, formData).then((res) => {
        imageUrl = res.data.data.display_url;
      });
    }
    const classDataUpdate = {
      availableSeats: parseInt(availableSeats),
      email,
      image: image.length > 0 ? imageUrl : classData.image,
      instructor,
      name,
      price: parseInt(price),
    };
    axiosSecure
      .patch(`/myClasses/${id}?email=${user?.email}`, classDataUpdate)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount) {
          toast.success("Updated Successfully");
          navigate("/dashboard/myClasses");
        }
      });
  };

  return (
    <div className="p-4">
      <form
        className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:border border-gray-300 rounded-md md:shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-4xl font-medium text-center mb-12">Update A Class</p>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              defaultValue={user?.displayName}
              readOnly
              {...register("instructor", { required: true })}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Instructor Email
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              defaultValue={user?.email}
              readOnly
              {...register("email", { required: true })}
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              defaultValue={classData?.name}
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Image
            </label>
            <input
              className="w-full border border-gray-300 rounded-md file-input file-input-ghost focus:outline-none focus:border-blue-500"
              type="file"
              {...register("image")}
            />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Available Seats
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              max="20"
              defaultValue={classData?.availableSeats}
              {...register("availableSeats", { required: true })}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              defaultValue={classData?.price}
              required
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <button
          className="w-full mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Update a Class
        </button>
      </form>
    </div>
  );
};

export default UpdateClass;
