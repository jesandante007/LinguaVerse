import React from 'react';

const PopularClass = ({cls}) => {
    const { name, image, instructor } = cls;
    return (
        <div className="card border border-gray-300 shadow-xl px">
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
      </div>
    </div>
    );
};

export default PopularClass;