import React, { useContext } from "react";
import Typewriter from "react-ts-typewriter";
import { AuthContext } from "../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const DashboardHome = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className="max-w-5xl h-screen flex items-center justify-center">
      <Helmet>
        <title>LinguaVerse | Dashboard Home</title>
      </Helmet>
      <p className="text-5xl font-medium">
        <Typewriter speed={100} text={`Welcome ${user?.displayName}\nto your \n Dashboard !`} loop={true} />
      </p>
    </div>
  );
};

export default DashboardHome;
