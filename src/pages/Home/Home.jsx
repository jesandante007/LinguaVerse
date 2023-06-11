import React from "react";
import HomeSlider from "../../components/Sliders/HomeSlider";
import PopularClasses from "./PopularClasses";
import PopularInstructors from "./PopularInstructors";
import StudentsFeedback from "./StudentsFeedback";
import { Helmet } from "react-helmet-async";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>LinguaVerse | Home</title>
      </Helmet>
      <HomeSlider />
      <PopularClasses />
      <PopularInstructors />
      <StudentsFeedback />
    </div>
  );
};

export default Home;
