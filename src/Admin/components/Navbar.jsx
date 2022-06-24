import React from "react";

function Navbar() {
  return (
    <div className="bg-green-500 flex w-screen h-16 justify-end fixed top-0 z-10">
      <div className="container bg-gray-300 h-full flex justify-end pt-3 pr-4">
        <button className="w-20 h-10 border border-red-700">LOGO</button>
        <button className="w-20 h-10 border border-red-700">LOGO</button>
      </div>
    </div>
  );
}

export default Navbar;
