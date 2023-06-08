import React from 'react';

const PopularInstructor = ({instructor}) => {
    const {name, image, classes} = instructor;
    return (
        <div className="card border border-gray-300 shadow-xl px">
      <figure className="px-4 pt-4 md:px-8 md:pt-8">
        <img
          src={image}
          className="rounded-xl h-52 md:h-64 w-full object-cover object-top"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <div><span className="font-semibold">Instructor of:</span> <ul>{classes.map((cls,i) => <li key={i}>{cls}</li>)}</ul></div>
      </div>
    </div>
    );
};

export default PopularInstructor;