import { Dialog, Transition } from "@headlessui/react";
import React, { Fragment, useRef, useState } from "react";
import { XIcon } from "@heroicons/react/solid";
import API_URL from "../../Helpers/API_URL";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function ModalPaymentProof(props) {
  const photoRef = useRef();
  const initialStateImage = { file: null, filePreview: null };
  const [selectedImage, setSelectedImage] = useState(initialStateImage);
  const [loading, setLoading] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");

  const {
    isOpen,
    closeModal,
    id,
    checkoutCart,
    transaction_code,
    getOrderDetails,
  } = props;

  const onClose = () => {
    closeModal();
    setSelectedImage(initialStateImage);
    setSubmitClicked(false);
    setErrorType(false);
  };

  const onFileChange = (e) => {
    const type = e.target.files[0].name.split(".");
    if (
      !["jpg", "jpeg", "JPG", "JPEG", "png"].includes(type[type.length - 1])
    ) {
      setErrorMessage("Format yang kamu pilih tidak terdukung");
      setSelectedImage({
        file: null,
        filePreview: null,
      });
      return setErrorType(true);
    }
    setErrorType(false);
    setSubmitClicked(false);
    if (e.target.files[0]) {
      setSelectedImage({
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const submitOrder = async () => {
    try {
      let insertData = {
        checkoutCart,
        id,
        transaction_code,
      };
      if (errorType) {
        return;
      }
      setSubmitClicked(true);
      if (!selectedImage.file) {
        setErrorMessage("Kamu belum memilih foto");
        return;
      }
      setLoading(true);
      let token = Cookies.get("token");
      let formData = new FormData();

      formData.append("payment_photo", selectedImage.file);
      formData.append("data", JSON.stringify(insertData));
      await axios.patch(`${API_URL}/transaction/upload-payment`, formData, {
        headers: { authorization: token },
      });
      onClose();
      toast.success(`Foto berhasil diunggah!`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      getOrderDetails();
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

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
                  <h1 className="font-bold text-secondary">
                    Unggah Bukti Pembayaran
                  </h1>
                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div
                  className={`${
                    selectedImage?.filePreview ? "h-[560px]" : "h-[100px]"
                  } duration-300 w-full flex flex-col gap-y-5 relative items-center justify-center border-y py-5`}
                >
                  {selectedImage?.filePreview && (
                    <figure className="bg-black/20 w-full flex h-[450px] duration-300 justify-center">
                      <img
                        src={selectedImage.filePreview}
                        alt=""
                        className="h-full"
                      />
                    </figure>
                  )}
                  <input
                    type="file"
                    ref={photoRef}
                    className="hidden"
                    name="photo"
                    accept=".jpg,.jpeg,.JPG,.JPEG,.png"
                    onClick={(e) => (e.target.value = null)}
                    onChange={onFileChange}
                  />
                  <button
                    type="button"
                    className="button-primary px-5"
                    onClick={() => photoRef.current.click()}
                  >
                    {selectedImage.filePreview ? "Ganti Foto" : "Pilih Foto"}
                  </button>
                  {(!selectedImage?.file && submitClicked) || errorType ? (
                    <span className="text-red-600 absolute bottom-0">
                      {ErrorMessage}
                    </span>
                  ) : null}
                </div>
                <div className="w-full h-fit flex">
                  <button
                    className={`button-primary w-full h-12 disabled:bg-gray-500 ${
                      loading && "button-loading"
                    }`}
                    disabled={loading}
                    onClick={submitOrder}
                  >
                    {loading ? "Mengunggah Foto" : "Unggah Bukti Pembayaran"}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalPaymentProof;
