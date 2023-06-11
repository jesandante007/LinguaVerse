import React from "react";
import HomeSlider from "../../components/Sliders/HomeSlider";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import StudentsFeedback from "./StudentsFeedback";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <PopularClasses />
      <PopularInstructors />
      <StudentsFeedback />
    </div>
  );
};

export default Home;
