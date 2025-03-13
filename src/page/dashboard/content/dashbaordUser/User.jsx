import React from "react";
import Section1 from "./Section1";
import Section2 from "./Section2";
import Section3 from "./Section3";
import Section4 from "./Section4";

const User = () => {
  return (
    <div className="p-4 sm:ml-64 mt-[88px]  max-w-screen-xl">
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </div>
  );
};

export default User;
