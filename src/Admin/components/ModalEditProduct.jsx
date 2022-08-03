import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddDetails1 from "./AddDetails1";
import AddDetails2 from "./AddDetails2";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { XIcon } from "@heroicons/react/outline";
import { toast } from "react-toastify";
import AddImage from "./AddImage";
import DetailsPreview from "./DetailsPreview";
import {
  categoryList,
  golonganList,
  satuanList,
} from "../../Helpers/categoryList";
import Loading from "../../User/Component/Loading";

function ModalEditProduct(props) {
  const { modalEdit, closeModalEdit, editId, setEditId, getProducts } = props;
  const initialState1 = {
    name: "",
    NIE: "",
    category: "",
    golongan: "",
    tgl_kadaluarsa: "",
    indikasi: "",
    komposisi: "",
    cara_penyimpanan: "",
    principal: "",
    cara_pakai: "",
    peringatan: "",
  };
  const initialState2 = {
    stock: 0,
    satuan: "",
    kemasan: "",
    price: "",
    modal: "",
    promo: "",
    berat: "",
  };
  const initialState3 = {
    photo: { file: null, filePreview: null },
  };

  const [modalState, setModalState] = useState(1);
  const [details1, setDetails1] = useState(initialState1);
  const [details2, setDetails2] = useState(initialState2);
  const [detailImage, setDetailImage] = useState(initialState3);
  const [loading, setLoading] = useState(true);

  const cancel = () => {
    closeModalEdit();
    setTimeout(() => {
      setModalState(1);
      setDetails1(initialState1);
      setDetails2(initialState2);
      setDetailImage(initialState3);
      setEditId(null);
    }, 500);
  };

  const getDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/product-details`, {
        params: { id: editId },
      });
      const {
        name,
        NIE,
        category,
        golongan,
        tgl_kadaluarsa,
        indikasi,
        komposisi,
        cara_penyimpanan,
        principal,
        cara_pakai,
        peringatan,
        satuan,
        kemasan,
        price,
        modal,
        promo,
        berat,
        photo,
      } = res.data.data;
      let catList = categoryList.map((val, i) => {
        return { name: val.cardText, value: i + 1 };
      });
      setDetails1({
        name,
        NIE,
        category: (() => {
          for (const cat of catList) {
            if (category === cat.name) return cat.value;
          }
        })(),
        golongan: (() => {
          for (const gol of golonganList) {
            if (golongan === gol.content) return gol.value;
          }
        })(),
        tgl_kadaluarsa,
        indikasi,
        komposisi,
        cara_penyimpanan,
        principal,
        cara_pakai,
        peringatan,
      });
      setDetails2({
        satuan: (() => {
          for (const sat of satuanList) {
            if (satuan === sat.content) return sat.value;
          }
        })(),
        kemasan,
        price,
        modal,
        promo,
        berat,
      });
      setDetailImage({
        photo: {
          file: null,
          filePreview: photo ? `${API_URL}/${photo}` : null,
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const finalSubmit = async () => {
    try {
      const insertData = {
        ...details1,
        ...details2,
        id: editId,
      };
      let formData = new FormData();
      if (detailImage.photo.file) {
        formData.append("product_photo", detailImage.photo.file);
      }
      formData.append("data", JSON.stringify(insertData));

      await axios.patch(`${API_URL}/admin/edit-product`, formData);
      toast.success(`Produk berhasil diubah`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      cancel();
      setDetails1(initialState1);
      setDetails2(initialState2);
      getProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const printForm = (state) => {
    switch (state) {
      case 1:
        return (
          <AddDetails1
            editId={editId}
            details1={details1}
            setDetails1={setDetails1}
            setModalState={setModalState}
          />
        );
      case 2:
        return (
          <AddDetails2
            details2={details2}
            setDetails2={setDetails2}
            setModalState={setModalState}
            editId={editId}
          />
        );
      case 3:
        return (
          <AddImage
            detailImage={detailImage}
            setDetailImage={setDetailImage}
            setModalState={setModalState}
            editId={editId}
          />
        );
      case 4:
        return (
          <DetailsPreview
            details1={details1}
            details2={details2}
            detailImage={detailImage}
            setModalState={setModalState}
            finalSubmit={finalSubmit}
            editId={editId}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (editId && modalEdit) getDetails();
    // eslint-disable-next-line
  }, [editId, modalEdit]);

  return (
    <Transition appear show={modalEdit} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
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
              <Dialog.Panel className="w-[800px] h-full flex flex-col gap-y-2 transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative"
                >
                  <h1 className="font-bold">Ubah Detail Produk</h1>

                  <button
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={cancel}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div className="h-16 flex items-center">
                  <div className="text-md breadcrumbs">
                    <ul>
                      <li className="w-full flex items-center gap-x-2">
                        <span
                          className={`${
                            modalState === 1 ? "bg-primary" : "bg-neutral-gray"
                          } duration-300 rounded-full font-bold text-white h-6 aspect-square text-center`}
                        >
                          1
                        </span>
                        Detail Obat
                      </li>
                      <li className="w-full flex items-center gap-x-2">
                        <span
                          className={`${
                            modalState === 2 ? "bg-primary" : "bg-neutral-gray"
                          } duration-300 rounded-full font-bold text-white h-6 aspect-square text-center`}
                        >
                          2
                        </span>
                        Detail Kuantitas & Harga
                      </li>
                      <li className="w-full flex items-center gap-x-2">
                        <span
                          className={`${
                            modalState === 3 ? "bg-primary" : "bg-neutral-gray"
                          } duration-300 rounded-full font-bold text-white h-6 aspect-square text-center`}
                        >
                          3
                        </span>
                        Gambar Produk
                      </li>
                      <li className="w-full flex items-center gap-x-2">
                        <span
                          className={`${
                            modalState === 4 ? "bg-primary" : "bg-neutral-gray"
                          } duration-300 rounded-full font-bold text-white h-6 aspect-square text-center`}
                        >
                          4
                        </span>
                        Konfirmasi
                      </li>
                    </ul>
                  </div>
                </div>
                {loading ? <Loading /> : printForm(modalState)}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ModalEditProduct;
