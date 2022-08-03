import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import formatToCurrency from "../../Helpers/formatToCurrency";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { paymentMethods } from "../../Helpers/paymentMethods";
import { ChevronLeftIcon, XIcon } from "@heroicons/react/solid";
import API_URL from "../../Helpers/API_URL";
import axios from "axios";
import { toast } from "react-toastify";

function ModalPaymentMethod(props) {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    modalPaymentMethod,
    setModalPaymentMethod,
    totalPrice,
    cart,
    dataAddress,
    selectedMethod,
    id,
    checkoutCart,
    transaction_code,
  } = props;

  const onClose = () => {
    setModalPaymentMethod(false);
  };

  const submitOrder = async () => {
    let insertData = {
      cart,
      payment_method: paymentMethod.value,
      selected_address: dataAddress,
      total_price: totalPrice,
      shipping_method: `${selectedMethod.kurir} ${selectedMethod.jenis}`,
      checkoutCart,
      id,
    };
    try {
      setLoading(true);
      await axios.patch(`${API_URL}/transaction/payment-method`, insertData);
      onClose();
      toast.success(`Metode Pembayaran telah dipilih!`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      navigate(`/order?id=${transaction_code}`);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { backgroundColor: "#FF6B6B" },
      });
    } finally {
      setLoading(false);
    }
  };
  const printMethods = () => {
    return paymentMethods.map((val, i) => {
      return (
        <button
          className="btn-plain h-16 w-full flex items-center border-y px-5"
          key={i}
          onClick={() => {
            setModalState(2);
            setPaymentMethod(val);
          }}
        >
          <figure className="w-1/5">
            <img src={val.image} alt="" className="" />
          </figure>
          <div className="w-3/5 flex justify-start pl-5 font-semibold text-secondary">
            {val.name} Virtual Account
          </div>
          <div className="w-1/5 flex justify-end">
            <ChevronRightIcon className="h-6" />
          </div>
        </button>
      );
    });
  };

  const printModalState = (state) => {
    switch (state) {
      case 1:
        return (
          <div
            className={`w-full h-4/6 flex flex-col border-y ${
              modalState === 2 ? "-translate-x-full" : "translate-x-0"
            }`}
          >
            {printMethods()}
          </div>
        );
      case 2:
        return (
          <div
            className={`w-full h-4/6 flex flex-col border-y border shadow-custom rounded-lg gap-y-5 p-5 items-center
            ${modalState === 1 ? "translate-x-full" : "translate-x-0"}`}
          >
            <div className="flex justify-between w-full h-fit items-center">
              <h1 className="font-bold text-secondary">
                {paymentMethod.name} Virtual Account
              </h1>
              <img src={paymentMethod.image} alt="" className="h-7" />
            </div>
            <div className="w-full flex flex-col items-start gap-y-3">
              <h2>Cara Pembayaran</h2>
              <ul className="list-disc flex flex-col gap-y-2">
                <li className="ml-5">
                  {`Tagihan ini akan otomatis menggantikan tagihan ${paymentMethod.name} Virtual account yang belum terbayar.`}
                </li>
                <li className="ml-5">
                  Tidak disarankan pembayaran melalui bank agar transaksi dapat
                  diproses tanpa kendala
                </li>
                <li className="ml-5">
                  Dapatkan kode pembayaran setelah klik pembayaran.
                </li>
              </ul>
            </div>
          </div>
        );
      default:
        break;
    }
  };

  return (
    <Transition appear show={modalPaymentMethod} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[500px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 pt-4 pb-8 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  {modalState === 2 ? (
                    <button
                      className="btn-plain flex justify-center items-center  absolute left-0"
                      onClick={() => {
                        setModalState(1);
                        setPaymentMethod(null);
                      }}
                    >
                      <ChevronLeftIcon className="h-10" />
                    </button>
                  ) : null}
                  <h1 className="font-bold text-secondary">
                    Metode Pembayaran
                  </h1>
                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div
                  className={`h-[500px] w-full flex flex-col gap-y-5 duration-500`}
                >
                  <div className="w-full h-20 border shadow-custom rounded-lg flex justify-between px-5 items-center">
                    <h2 className="font-bold text-secondary">Total Tagihan</h2>
                    <h2 className="font-bold text-secondary">
                      {formatToCurrency(totalPrice)}
                    </h2>
                  </div>
                  {printModalState(modalState)}
                  <div className="w-full h-fit flex">
                    <button
                      className={`button-primary w-full h-12 disabled:bg-gray-500 ${
                        loading && "button-loading"
                      }`}
                      disabled={!paymentMethod || loading}
                      onClick={submitOrder}
                    >
                      {loading
                        ? "Memproses Pesanan"
                        : "Pilih Metode Pembayaran"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalPaymentMethod;
