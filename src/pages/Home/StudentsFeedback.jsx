import React from "react";
import StudentFeedback from "../../components/Cards/StudentFeedback";

const StudentsFeedback = () => {
  return (
    <div className="container mx-auto my-20">
      <p className="text-center text-4xl font-medium mb-24">Students Feedback</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-0">
        <StudentFeedback />
        <StudentFeedback />
        <StudentFeedback />
      </div>
    </div>
  );
};

export default StudentsFeedback;
