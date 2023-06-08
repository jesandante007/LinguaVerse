import React from "react";
import HomeSlider from "../../components/Sliders/HomeSlider";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";

const Home = () => {
  return (
    <div>
      <HomeSlider />
      <PopularClasses />
      <PopularInstructors />
    </div>
  );
};

export default Home;
