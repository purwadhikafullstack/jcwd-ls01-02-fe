import React from "react";

function Leftbar() {
  return (
    <div className="bg-white h-screen flex w-64 fixed top-0 z-20">
      <div className="container h-full">
        <button className="w-full h-24 border border-red-500">Logo</button>
        <button className="w-full h-24 border border-red-500">Dashboard</button>
        <button className="w-full h-24 border border-red-500">Produk</button>
        <button className="w-full h-24 border border-red-500">Transaksi</button>
        <button className="w-full h-24 border border-red-500">
          Sales and Revenue
        </button>
      </div>
    </div>
  );
}

export default Leftbar;
