import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import PopularInstructor from "../../components/Cards/PopularInstructor";

const PopularInstructors = () => {
  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/instructors`);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto mt-20">
      <p className="text-center text-4xl font-medium mb-8">Popular Instructors</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        {instructors.slice(0, 6).map((instructor) => (
          <PopularInstructor key={instructor._id} instructor={instructor} />
        ))}
      </div>
    </div>
  );
};

export default PopularInstructors;
