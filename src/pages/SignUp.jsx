import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import axios from "axios";
import { toast } from "react-hot-toast";
import { saveUser } from "../api/auth";
import { Helmet } from "react-helmet-async";

const SignUp = () => {
  const { createUser, updateUserData } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { name, email, password, cPassword, image } = data;
    if (password !== cPassword) {
      toast.error("Password didn't match");
    } else {
      const formData = new FormData();
      formData.append("image", image[0]);
      const url = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_KEY
      }`;
      axios.post(url, formData).then((res) => {
        const imageUrl = res.data.data.display_url;
        createUser(email, password)
          .then((result) => {
            updateUserData(name, imageUrl)
              .then(() => {
                saveUser(result.user)
                toast.success("Sign Up successful");
                navigate(from, { replace: true });
              })
              .catch((error) => {
                console.error(error.message);
              });
          })
          .catch((error) => {
            console.log(error.message);
          });
      });
    }
  };
  return (
    <div className="p-4">
      <Helmet>
        <title>LinguaVerse | SignUp</title>
      </Helmet>
      <form
        className="max-w-md mx-auto px-4 md:px-8 py-10 md:border border-gray-300 rounded-md md:shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center mb-12">
          <p className="text-4xl font-medium">Sign Up</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="text"
            {...register("name", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            type="email"
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoMdEye size={22} /> : <IoMdEyeOff size={22} />}
            </button>
          </div>
          {errors.password?.type === "minLength" && (
            <span className="text-error">Password must be 6 characters</span>
          )}
          {errors.password?.type === "pattern" && (
            <span className="text-error">
              Password must have one Uppercase one lower case, one number and
              one special character.
            </span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirm Password
          </label>
          <div className="relative">
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              type={showPassword ? "text" : "password"}
              {...register("cPassword", { required: true })}
            />
            <button
              type="button"
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <IoMdEye size={22} /> : <IoMdEyeOff size={22} />}
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Photo
          </label>
          <input
            className="w-full border border-gray-300 rounded-md file-input file-input-ghost"
            type="file"
            {...register("image", { required: true })}
          />
        </div>
        <button
          className="w-full mb-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-center">
          Already a member?{" "}
          <Link to="/login" className="text-blue-500">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
