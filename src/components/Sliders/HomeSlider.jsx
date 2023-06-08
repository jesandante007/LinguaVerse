import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider1 from "../../assets/images/slider/slider1.jpg";
import slider2 from "../../assets/images/slider/slider2.jpg";
import slider3 from "../../assets/images/slider/slider3.jpg";
import slider4 from "../../assets/images/slider/slider4.jpg";
import slider5 from "../../assets/images/slider/slider5.jpg";

const HomeSlider = () => {
  return (
    <Carousel className="container mx-auto mt-4">
      <div>
        <img src={slider1} />
      </div>
      <div>
        <img src={slider2} />
      </div>
      <div>
        <img src={slider3} />
      </div>
      <div>
        <img src={slider4} />
      </div>
      <div>
        <img src={slider5} />
      </div>
    </Carousel>
  );
};

export default HomeSlider;
