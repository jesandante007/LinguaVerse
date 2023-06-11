import React from "react";
import img from "../assets/images/404-page-animation.gif";
import { Link } from "react-router-dom";
import MotionButton from "../components/Button/MotionButton";
import { Helmet } from "react-helmet-async";

const ErrorPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>LinguaVerse | Error</title>
      </Helmet>
      <div>
        <img src={img} alt="error image" />
        <div className="text-center mt-5">
          <Link to="/">
            <MotionButton>
              <button className="btn bg-blue-500 hover:bg-blue-700 text-white">
                Back to Home
              </button>
            </MotionButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
