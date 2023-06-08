import React, { useContext } from "react";
import AllClass from "../components/Cards/AllClass";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const AllClasses = () => {
  const {user} = useContext(AuthContext)

  const { data: classes = [] } = useQuery({
    queryKey: ["classes"],
    queryFn: async () => {
      const res = await axios(`${import.meta.env.VITE_API_URL}/classes`);
      return res.data;
    },
  });

  const handleSelect = id => {
    
  }
  return (
    <div className="container mx-auto my-4">
      <p className="text-5xl text-center font-medium mb-8">
        Explore Our Language Classes
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        {classes.map((cls) => (
          <AllClass key={cls._id} cls={cls} />
        ))}
      </div>
    </div>
  );
};

export default AllClasses;
