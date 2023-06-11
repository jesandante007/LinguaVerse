import React, { useContext } from "react";
import Typewriter from "react-ts-typewriter";
import { AuthContext } from "../../providers/AuthProvider";

const DashboardHome = () => {
    const {user} = useContext(AuthContext)
  return (
    <div className="max-w-5xl h-screen flex items-center justify-center">
      <p className="text-5xl font-medium">
        <Typewriter speed={100} text={`Welcome ${user?.displayName}\nto your \n Dashboard !`} loop={true} />
      </p>
    </div>
  );
};

export default DashboardHome;
