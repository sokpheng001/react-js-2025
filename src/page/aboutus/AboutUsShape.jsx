// import React from "react";
// import leftshape from "../../../public/img/vextor/leftshape.svg";
// import rightshape from "../../../public/img/vextor/rightshape.svg";

// export default function AboutUsShape({children , className=""}) {
//   return (
//     <div className={` max-w-screen-xl${className}`}>
//       <div className="relative">
//         <img
//           src={leftshape}
//           alt="shape"
//           className="absolute top-32 left-0 -z-10 hidden md:block w-[400px] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[755px] "
//         />
//       </div>
//       <div>
//         <img src={rightshape}
//         className="absolute top-32 right-0 -z-10 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] xl:w-[550px] sm:h-[300px] md:h-[550px] lg:h-[600px] xl:h-[700px]"
//         alt="" />
//       </div>
//       {children}
//     </div>
//   );
// }

import React from "react";
import leftshape from "../../../public/img/vextor/leftshape.svg";
import rightshape from "../../../public/img/vextor/rightshape.svg";

export default function AboutUsShape({ children, className = "" }) {
  return (
    <div className={`max-w-screen-xl relative mx-auto ${className}`}>
      {/* Left Shape */}
      <div className="absolute top-0 -left-52 -z-10 hidden lg:block">
        <img
          src={leftshape}
          alt="Left Shape"
          className="w-[400px] fill-primary-100 sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[755px]"
        />
      </div>
      <div className="absolute -top-6 -z-10 hidden lg:block  lg:-right-8 xl:-right-48">
        <img
        className="sm:h-[300px] md:h-[550px] lg:h-[600px] xl:h-[700px]"
        src={rightshape} alt="" />
      </div>
      {children}
    </div>
  );
}
