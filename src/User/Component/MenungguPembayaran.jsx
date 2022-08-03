import { ChevronDownIcon, ZoomInIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../Helpers/API_URL";
import { fullDateGenerator } from "../../Helpers/dateGenerator";
import CardCartCheckout from "./CardCartCheckout";
import ModalZoomImage from "./ModalZoomImage";
import Timer from "./Timer";
import bcaIcon from "../../Assets/bca-icon.png";
import mandiriIcon from "../../Assets/mandiri-icon.png";
import permataIcon from "../../Assets/permata-icon.png";
import ovoIcon from "../../Assets/ovo-icon.png";
import gopayIcon from "../../Assets/gopay-icon.png";
import shopeepayIcon from "../../Assets/shopeepay-icon.png";
import CaraPembayaran from "./CaraPembayaran";
import formatToCurrency from "../../Helpers/formatToCurrency";
import { DocumentDuplicateIcon } from "@heroicons/react/solid";
import { toast } from "react-toastify";
import ModalPaymentProof from "./ModalPaymentProof";

function MenungguPembayaran({ data, getOrderDetails }) {
  const navigate = useNavigate();
  let {
    id,
    payment_method,
    total_price,
    date_requested,
    prescription_photo,
    transaction_code,
    expired_at,
  } = data.dataOrder;
  const { checkoutCart } = data;
  const { cart } = data;
  const [modalZoom, setModalZoom] = useState(false);
  const [modalProof, setModalProof] = useState(false);

  const paymentMethod = (type) => {
    switch (type) {
      case "BCA":
        return {
          image: bcaIcon,
          name: "BCA",
          list: ["ATM BCA", "m-BCA (BCA Mobile)", "Internet Banking BCA"],
        };
      case "MANDIRI":
        return {
          image: mandiriIcon,
          name: "Mandiri",
          list: [
            "ATM Mandiri",
            "m-Banking Mandiri (Mandiri Livin)",
            "Internet Banking Mandiri",
          ],
        };
      case "PERMATA":
        return {
          image: permataIcon,
          name: "Permata Bank",
          list: [
            "ATM Permata Bank",
            "m-Banking Permata Bank (PermataMobile X)",
            "Internet Banking Mandiri",
          ],
        };
      case "GOPAY":
        return {
          image: gopayIcon,
          name: "Gopay",
          list: ["GoPay"],
        };
      case "OVO":
        return {
          image: ovoIcon,
          name: "OVO",
          list: ["OVO"],
        };
      case "SHOPEEPAY":
        return {
          image: shopeepayIcon,
          name: "Shopeepay",
          list: ["ShopeePay"],
        };
      default:
        return null;
    }
  };

  const payment = paymentMethod(payment_method);

  const onCloseZoom = () => {
    setModalZoom(false);
  };
  const onOpenZoom = () => {
    setModalZoom(true);
  };

  const onCloseProof = () => {
    setModalProof(false);
  };
  const onOpenProof = () => {
    setModalProof(true);
  };

  const copyToClipboard = (id) => {
    var r = document.createRange();
    r.selectNode(document.getElementById(id));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(r);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
  };

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

  const printCaraPembayaran = () => {
    const { name, list } = payment;
    return list.map((val, i) => {
      return <CaraPembayaran data={val} name={name} key={i} />;
    });
  };

  return (
    <>
      <ModalZoomImage
        isOpen={modalZoom}
        closeModal={onCloseZoom}
        photo={prescription_photo}
      />
      <ModalPaymentProof
        isOpen={modalProof}
        closeModal={onCloseProof}
        transaction_code={transaction_code}
        id={id}
        checkoutCart={checkoutCart}
        getOrderDetails={getOrderDetails}
      />
      <h1 className="h-6 w-full font-bold text-secondary text-2xl">
        Menunggu Pembayaran
      </h1>
      <div className="w-full border flex justify-between items-end rounded-lg p-5 bayangan">
        <div className="w-2/5 flex flex-col gap-y-3">
          <div>
            <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
            <h3 className="font-bold text-secondary">{transaction_code}</h3>
          </div>
          <h3 className="text-gray-500">Batas waktu respon</h3>
          <h2 className="w-full font-bold text-secondary text-xl">
            {fullDateGenerator(expired_at)}
          </h2>
        </div>
        <div className="h-full flex flex-col gap-y-3 items-end">
          <h3 className="text-sm text-gray-500">
            Mohon melakukan pembayaran dalam jangka waktu
          </h3>
          <Timer time={expired_at} type="user" />
        </div>
      </div>
      {prescription_photo ? (
        <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
          <h1 className="h-6 w-full font-bold text-secondary text-xl">
            Detail Resep
          </h1>
          <div className="w-full flex h-36 gap-x-5">
            <figure className="aspect-square h-full border rounded-lg overflow-hidden">
              <img src={API_URL + prescription_photo} alt="" />
            </figure>
            <div className="flex-grow h-full flex flex-col justify-between items-start">
              <div className="flex flex-col gap-y-1">
                <h3 className="text-sm text-gray-500">Nomor Transaksi</h3>
                <h3 className="font-bold text-secondary">{transaction_code}</h3>
              </div>
              <button
                className="btn-plain text-primary font-semibold flex items-center gap-x-2"
                onClick={onOpenZoom}
              >
                <ZoomInIcon className="h-5" />
                Perbesar Gambar
              </button>
            </div>
            <div className="h-full flex flex-col gap-y-1">
              <h3 className="text-sm text-gray-500 text-right">
                Tanggal Pengajuan
              </h3>
              <h3 className="font-bold text-secondary">
                {fullDateGenerator(date_requested)}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Ringkasan Order
        </h1>
        <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
          {printCartCard()}
        </div>
      </div>
      <div className="w-full h-72 flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
        <h1 className="h-6 w-full font-bold text-secondary text-xl">
          Pembayaran
        </h1>
        <div className="h-20 w-full flex justify-between items-center">
          <h1 className="text-secondary font-bold text-xl">
            {payment.name} Virtual Account
          </h1>
          <img src={payment.image} alt="" className="h-10" />
        </div>
        <div className="h-20 w-full flex justify-between items-center">
          <div className="h-full flex flex-col justify-between">
            <h3 className="text-sm text-gray-500 font-semibold">
              Nomor Virtual Account
            </h3>
            <h2 className="text-2xl font-bold text-secondary" id="NoVA">
              80777082261130123
            </h2>
          </div>
          <button
            className="btn-plain h-fit text-primary font-bold flex gap-x-3"
            onClick={() => {
              copyToClipboard("NoVA");
              toast.success(`Nomor Virtual Account telah disalin!`, {
                theme: "colored",
                style: { backgroundColor: "#009B90" },
              });
            }}
          >
            Salin <DocumentDuplicateIcon className="h-6" />
          </button>
        </div>
        <div className="w-full h-20 flex flex-col justify-between">
          <h3 className="text-sm text-gray-500 font-semibold">
            Total Pembayaran
          </h3>
          <h2 className="text-2xl font-bold text-secondary">
            {formatToCurrency(total_price)}
          </h2>
        </div>
      </div>

      <div className="w-full h-14 flex gap-x-4 mb-10">
        <button
          className="h-full w-1/2 button-outline"
          onClick={() => navigate("/myaccount/orders?status=all")}
        >
          Cek Status Pembayaran Lainnya
        </button>
        <button className="h-full w-1/2 button-primary" onClick={onOpenProof}>
          Upload Bukti Pembayaran
        </button>
      </div>
      <div className="w-full border-t border-neutral-gray" />
      <div className="w-full h-full bg-white flex flex-col">
        <h1 className="h-6 w-full font-bold text-secondary text-xl mb-5">
          Cara Pembayaran
        </h1>
        <div className="w-full border-y">{printCaraPembayaran()}</div>
      </div>
    </>
  );
}

export default MenungguPembayaran;
