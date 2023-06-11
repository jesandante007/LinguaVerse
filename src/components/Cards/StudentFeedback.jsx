import React from "react";
import image from '../../assets/images/img.png'
import { FaStar } from "react-icons/fa";

const StudentFeedback = () => {
  return (
    <div className="card card-compact shadow-xl relative border border-gray-300 mt-12 lg:mt-0">
      <figure className="w-full">
        <img className="h-32 absolute ring-2 ring-offset-1 rounded-full" src={image} />
      </figure>
      <div className="card-body text-center">
        <p className="mt-12 text-lg tracking-wider">Tanvir Ahmad</p>
        <p className="my-3 text-gray-500">
          Fantastic language program! Knowledgeable instructors, engaging
          classes, and effective learning. The perfect choice for language
          enthusiasts!" "LinguaVerse Language School exceeded my expectations. I'm
          impressed with the quality of instruction and the progress I've made
          in such a short time. Highly recommended!
        </p>
        <div className="card-actions justify-center text-warning">
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
          <FaStar size={20} />
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
