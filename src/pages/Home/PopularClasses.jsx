import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import PopularClass from "../../components/Cards/PopularClass";

const PopularClasses = () => {
  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/classes`);
      return res.data;
    },
  });
  return (
    <div className="container mx-auto mt-20">
      <p className="text-center text-4xl font-medium mb-8">Popular Classes</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        {classes.slice(0, 6).map((cls) => (
          <PopularClass key={cls._id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default PopularClasses;
