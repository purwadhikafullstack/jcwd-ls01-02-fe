import React from "react";
import rArrow from "../../../Assets/r-arrow.png";

function NextArrow(props) {
  const { onClick, height } = props;
  return (
    <button
      className={`-translate-x-20 opacity-0  group-hover:translate-x-0 border shadow-black/20 group-hover:opacity-100 button-general rounded-full h-10 aspect-square absolute z-10 -right-4 shadow-lg bg-white ${height}`}
      onClick={onClick}
    >
      <img src={rArrow} alt="" className="h-8" />
    </button>
  );
}

export default NextArrow;