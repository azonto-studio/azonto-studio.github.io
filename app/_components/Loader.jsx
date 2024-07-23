import React from 'react';

const Loader = () => {
  return (
    <span className="w-12 h-12 rounded-full border-3 border-solid border-white border-t-transparent border-l-transparent inline-block relative box-border animate-spin">
      <span className="w-10 h-10 absolute inset-0 m-auto border-3 border-solid border-transparent border-b-[#FF3D00] border-r-[#FF3D00] rounded-full box-border animate-[spin_0.5s_linear_infinite_reverse]"></span>
      <span className="w-8 h-8 absolute inset-0 m-auto border-3 border-solid border-white border-t-transparent border-l-transparent rounded-full box-border animate-[spin_1.5s_linear_infinite]"></span>
    </span>
  );
}

export default Loader;
