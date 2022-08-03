import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import API_URL from "../../Helpers/API_URL";
import CardAddress from "./CardAddress";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "./Loading";
import { Dialog, Transition } from "@headlessui/react";
import EditAddress from "./EditAddress";
import { XIcon } from "@heroicons/react/solid";

function ModalAllAddress(props) {
  const {
    setSelectedAddress,
    selectedAddress,
    setCourier,
    setSelectedMethod,
    setSelectedMethodCost,
    isOpen,
    closeModal,
    setDestinationId,
    setCourierShow,
  } = props;

  const dispatch = useDispatch();
  const [loadingAllAddress, setLoadingAllAddress] = useState(false);
  const [dataAddresses, setDataAddresses] = useState([]);
  const [editAddress, setEditAddress] = useState(false);
  const [address, setAddress] = useState(true);
  const [selectedEditAddress, setSelectedEditAddress] = useState(null);

  const changePrimaryAddress = async (data) => {
    try {
      let token = Cookies.get("token");
      setLoadingAllAddress(true);
      const res = await axios.patch(
        `${API_URL}/profile/change-primary-address`,
        data,
        {
          headers: { authorization: token },
        }
      );
      dispatch({ type: "CHANGEADDRESS", payload: data.id });
      setDataAddresses(res.data.data);
      toast.success(`Alamat utama telah diganti`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAllAddress(false);
    }
  };
  const closingModal = () => {
    closeModal();
    setTimeout(() => {
      setAddress(true);
      setEditAddress(false);
    }, 500);
  };

  const switchModal = () => {
    setAddress((prev) => !prev);
    setEditAddress((prev) => !prev);
    window.scrollTo(0, 0);
  };

  const changeAddress = (val) => {
    setSelectedAddress(val);
    setCourier("");
    toast.success("Alamat telah diganti", {
      theme: "colored",
      style: { backgroundColor: "#009B90" },
    });
    setSelectedMethod(null);
    setSelectedMethodCost(0);
    closeModal();
  };

  const getAllAddresses = async () => {
    try {
      let token = Cookies.get("token");
      setLoadingAllAddress(true);
      const res = await axios.get(`${API_URL}/profile/all-addresses`, {
        headers: { authorization: token },
      });
      setDataAddresses(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAllAddress(false);
    }
  };

  const printAddresses = () => {
    return dataAddresses.map((val, i) => {
      return (
        <div
          className={`w-full min-h-min flex flex-col gap-y-2 relative p-2 border-b border-neutral-gray ${
            selectedAddress?.id === val.id ? "bg-primary/20" : ""
          }`}
          key={i}
        >
          <CardAddress data={val} className="border-0 p-0" />
          {selectedAddress?.id === val.id ? null : (
            <button
              onClick={() => {
                setCourier("");
                setCourierShow("Pilih Kurir");
                changeAddress(val);
                setDestinationId(val.destination);
              }}
              className="button-primary px-5 absolute right-2 top-2"
            >
              Pilih Alamat
            </button>
          )}
          <div className="w-full flex justify-start gap-x-2 h-4 items-center">
            <span
              className="button-general h-full text-primary outline-0 py-0  rounded-none hover:font-semibold"
              onClick={() => {
                switchModal();
                setSelectedEditAddress(val);
              }}
            >
              Ubah Alamat
            </span>
            <div className="h-full border-r " />
            {val.primary_address ? (
              <span className="text-primary font-bold text-sm h-full">
                Alamat Utama
              </span>
            ) : (
              <button
                className="button-general h-full text-primary outline-0 py-0 rounded-none hover:font-semibold"
                onClick={() => changePrimaryAddress(val)}
              >
                Jadikan Alamat Utama
              </button>
            )}
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    if (isOpen) getAllAddresses();
  }, [isOpen]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closingModal}>
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
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 pt-4 pb-8 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">
                    {address ? "Pilih Alamat" : "Ubah Alamat"}
                  </h1>
                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={closingModal}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div
                  className={`${
                    editAddress ? "h-[750px]" : "max-h-[500px]"
                  } w-full overflow-y-scroll border border-neutral-gray duration-500`}
                >
                  {editAddress && (
                    <EditAddress
                      data={selectedEditAddress}
                      switchModal={switchModal}
                      address={address}
                      setDataAddresses={setDataAddresses}
                      setLoadingAllAddress={setLoadingAllAddress}
                      loadingAllAddress={loadingAllAddress}
                    />
                  )}
                  {address ? (
                    loadingAllAddress ? (
                      <Loading className="h-full" />
                    ) : (
                      printAddresses()
                    )
                  ) : null}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalAllAddress;
