import { useQuery } from "@tanstack/react-query";
import React from "react";
import PopularInstructor from "../components/Cards/PopularInstructor";
import axios from "axios";

const AllInstructors = () => {
  const { data: instructors = [] } = useQuery({
    queryKey: ["instructors"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/instructors`);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto my-4">
      <p className="text-5xl text-center font-medium mb-8">
        Meet Our Expert Instructors
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        {instructors.map((instructor) => (
          <PopularInstructor key={instructor._id} instructor={instructor} mail={true} />
        ))}
      </div>
    </div>
  );
};

export default AllInstructors;
