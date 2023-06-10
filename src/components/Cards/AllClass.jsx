import React from "react";

const AllClass = ({ cls, handleSelect, role }) => {
  const { name, image, instructor, availableSeats, price } = cls;
  return (
    <div
      className={`card border border-gray-300 shadow-xl ${
        availableSeats == 0 ? "bg-red-500" : ""
      }`}
    >
      <figure className="px-4 pt-4 md:px-8 md:pt-8">
        <img
          src={image}
          className="rounded-xl h-52 md:h-64 w-full object-cover"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>
          <span className="font-semibold">Instructor:</span> {instructor}
        </p>
        <p>
          <span className="font-semibold">Available Seats:</span>{" "}
          {availableSeats}
        </p>
        <p>
          <span className="font-semibold">Price:</span> ${price}
        </p>
        <button
          onClick={() => handleSelect(cls)}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded disabled:bg-gray-500"
          disabled={
            availableSeats == 0 || role == "admin" || role == "instructor"
          }
        >
          Select Course
        </button>
      </div>
    </div>
  );
};

export default AllClass;
