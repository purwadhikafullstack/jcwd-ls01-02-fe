import React from "react";
import { useNavigate } from "react-router-dom";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import CardCartCheckout from "./CardCartCheckout";
import chatIcon from "../../Assets/chat-icon.png";

function Dibatalkan({ data }) {
  const navigate = useNavigate();
  let {
    id,
    status,
    selected_address,
    payment_method,
    total_price,
    date_requested,
    date_process,
    prescription_photo,
    payment_photo,
    shipping_method,
    transaction_code,
    pesan,
    expired_at,
  } = data.dataOrder;
  const { cart } = data;

  const printCartCard = () => {
    return cart.map((val, i) => {
      return (
        <div key={i} className="w-full">
          <CardCartCheckout data={val} />
          <div className="w-full border-t border-neutral-gray" />
        </div>
      );
    });
  };

  return (
    <>
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Transaksi Dibatalkan
      </h1>
      <div className="w-full border flex justify-between rounded-lg p-5 bayangan">
        <div className="flex-grow w-1/4 h-full flex flex-col gap-y-3 items-start">
          <div>
            <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
            <h3 className="font-bold text-secondary">{transaction_code}</h3>
          </div>
          <div className="flex flex-col gap-y-1">
            <h3 className="text-sm text-gray-500">Tanggal Pengajuan</h3>
            <h3 className="font-bold text-secondary">
              {fullDateGenerator(date_requested)}
            </h3>
          </div>
        </div>
        <div className="w-1/4 flex flex-col gap-y-1 justify-end">
          <h3 className="text-sm text-gray-500">Tanggal Pembatalan</h3>
          <h3 className="font-bold text-danger">
            {fullDateGenerator(date_process)}
          </h3>
        </div>
      </div>
      {cart.length ? (
        <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
          <h1 className="h-6 w-full font-bold text-secondary text-xl">
            Ringkasan Order
          </h1>
          <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
            {printCartCard()}
          </div>
        </div>
      ) : null}
      {pesan ? (
        <div className="w-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
          <h1 className="h-6 w-full font-bold text-secondary text-xl">
            Alasan Pembatalan
          </h1>
          <p className="text-center text-danger w-full font-bold">{pesan}</p>
        </div>
      ) : null}

      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline flex gap-x-3"
          onClick={() => {}}
        >
          <img src={chatIcon} alt="" className="h-8" /> Chat Customer Service
        </button>
        <button
          className="h-full w-1/2 button-primary"
          onClick={() => navigate(`/myaccount/orders?status=all`)}
        >
          Cek Status Pembayaran Lainnya
        </button>
      </div>
    </>
  );
}

export default Dibatalkan;
