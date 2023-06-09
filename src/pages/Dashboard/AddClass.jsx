import React, { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";

const AddClass = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="p-4">
      <form
        className="max-w-5xl mx-auto px-4 md:px-8 py-10 md:border border-gray-300 rounded-md md:shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p className="text-4xl font-medium text-center mb-12">Add A Class</p>

        <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div className="">
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
          <div className="">
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
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Name
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              {...register("name", { required: true })}
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Class Image
            </label>
            <input
              className="w-full border border-gray-300 rounded-md file-input file-input-ghost focus:outline-none focus:border-blue-500"
              type="file"
              {...register("image", { required: true })}
            />
          </div>
        </div>
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10">
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Available Seats
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              max="20"
              {...register("availableSeats", { required: true })}
            />
          </div>
          <div className="">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Price
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type="number"
              {...register("price", { required: true })}
            />
          </div>
        </div>
        <button
          className="w-full mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Add a Class
        </button>
      </form>
    </div>
  );
};

export default AddClass;
