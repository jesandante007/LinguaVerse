import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const { signIn, googleSignIn } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then(() => {
        setError("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="p-4">
      <form
        className="max-w-md mx-auto px-4 md:px-8 py-10 md:border border-gray-300 rounded-md md:shadow"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex justify-between items-center mb-12">
          <p className="text-4xl font-medium">Sign In</p>
          <FcGoogle
            onClick={handleGoogleSignIn}
            size={25}
            className="btn btn-circle bg-transparent border border-gray-300 hover:border-blue-500 hover:bg-transparent p-[6px]"
          />
        </div>
        <p className="text-error mb-3">{error}</p>
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
              {...register("password", { required: true })}
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

        <button
          className="w-full mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Sign In
        </button>
        <div className="mb-8 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <input type="checkbox" className="checkbox checkbox-sm" />
            <span className="text-blue-500">Remember me</span>
          </div>
          <p className="cursor-pointer">Forgot Password</p>
        </div>
        <p className="text-center">Not a member? <Link to='/signUp' className="text-blue-500">Sign Up</Link></p>
      </form>
    </div>
  );
};

export default Login;
