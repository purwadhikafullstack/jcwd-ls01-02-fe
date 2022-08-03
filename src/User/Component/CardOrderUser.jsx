import { ClockIcon } from "@heroicons/react/outline";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import chatIcon from "../../Assets/chat-icon.png";
import transaksiActiveIcon from "../../Assets/transaksi-admin-active.png";
import API_URL from "../../Helpers/API_URL";
import { fullDateGenerator } from "../../Helpers/dateGenerator";

function CardOrderUser({ data, getOrders }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [status, setStatus] = useState(data.status);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full h-72 border flex flex-col bg-white rounded-lg overflow-hidden shadow-lg">
        <div
          className={`w-full h-14 flex justify-between items-center border-l-8 px-7 duration-300 ${
            checked ? "border-primary" : "border-white"
          }`}
        >
          <div className="flex gap-x-2">
            <span className="font-bold text-gray-500 flex gap-x-2 items-center">
              <ClockIcon className="h-5 aspect-square" />
              {fullDateGenerator(data.date_process)}
            </span>
          </div>
          <div className="flex gap-x-2">
            <span className="font-bold">{status.split("-").join(" ")}</span>
          </div>
        </div>
        <div className="border-b border-neutral-gray" />
        <div className="flex flex-col p-6 gap-y-3">
          <div className="flex h-20 w-auto gap-x-8">
            <div className="h-full aspect-square border rounded object-cover overflow-hidden">
              <img
                src={
                  data.transaction_code.split()[1] === "L"
                    ? ""
                    : API_URL + data.prescription_photo
                }
                alt="photo"
              />
            </div>
            <div className=" h-full " />
            <span className="font-bold -ml-10">{data.transaction_code}</span>
          </div>
          <div className="flex h-8 justify-between items-center mt-10">
            <button className="button-outline rounded-full flex gap-x-2 text-sm px-5">
              <img src={chatIcon} alt="" className="h-5 " />
              <span>Chat Costumer Service</span>
            </button>

            <button
              className="button-primary rounded-full flex gap-x-2 text-sm px-5"
              onClick={() => navigate(`/order?id=${data.transaction_code}`)}
            >
              <span>Detail Pesanan</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardOrderUser;
