import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";

function ModalEditOptions(props) {
  const {
    modalEditOptions,
    closeModalEditOptions,
    openModalEdit,
    openModalAddStock,
    setEditId,
  } = props;

  const onClose = () => {
    closeModalEditOptions();
    setEditId(null);
  };

  const editDetails = () => {
    closeModalEditOptions();
    setTimeout(() => {
      openModalEdit();
    }, 500);
  };
  const addStock = () => {
    closeModalEditOptions();
    setTimeout(() => {
      openModalAddStock();
    }, 500);
  };

  return (
    <Transition appear show={modalEditOptions} as={Fragment}>
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
              <Dialog.Panel className="min-w-min h-full flex flex-col  transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative mb-2"
                >
                  <h1 className="font-bold">Ubah Produk</h1>

                  <button
                    type="button"
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div className="w-full min-h-min py-5 px-5 flex gap-x-5">
                  <button
                    className="button-primary w-56 h-11"
                    onClick={editDetails}
                  >
                    Ubah Detail Produk
                  </button>
                  <button
                    className="button-primary w-56 h-11"
                    onClick={addStock}
                  >
                    Tambah Kuantitas Produk
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

export default ModalEditOptions;
