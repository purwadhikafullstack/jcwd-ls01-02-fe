import React from "react";
import tambahKeranjangIcon from "../../Assets/tambah-keranjang-icon.png";
import { HeartIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function BotBarDetailsMobile() {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => state.user);

  return (
    <div className="w-full h-20 sm:hidden fixed bottom-0 z-40 flex gap-x-4 p-5 bg-white overflow-hidden">
      <button className="button-outline aspect-square group">
        <HeartIcon className="h-full text-primary group-hover:text-pink-500 duration-300" />
      </button>
      <button
        className="button-outline aspect-square text-sm flex gap-x-2"
        onClick={() => (isLogin ? null : navigate("/login"))}
      >
        <img src={tambahKeranjangIcon} alt="" className="h-full " />{" "}
      </button>
      <button
        className="button-primary flex-grow text-sm"
        onClick={() => {
          isLogin ? navigate("/cart") : navigate("/login");
        }}
      >
        Beli Sekarang
      </button>
    </div>
  );
}

export default BotBarDetailsMobile;
