import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Loading from "../../User/Component/Loading";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  XIcon,
} from "@heroicons/react/solid";

function ModalProductStock(props) {
  const initialTerms = "";
  const [loading, setLoading] = useState(true);
  const [terms, setTerms] = useState(initialTerms);
  const [order, setOrder] = useState("ORDER BY product_id");
  let [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [productStock, setProductStock] = useState([]);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [sinceDate, setSinceDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { modalProductStock, closeModalProductStock, stockId, setStockId } =
    props;

  const onClose = () => {
    closeModalProductStock();
    setTimeout(() => {
      setStockId(null);
    }, 500);
  };

  const getProductStock = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/product-stock`, {
        params: { terms, page, limit, order },
      });
      setProductStock(res.data.data.productStock);
      setTotal(res.data.data.total);
      setTotalPages(() => Math.ceil(res.data.data.total / limit));
      setMinPage(0);
      setMaxPage(() => {
        if (totalPages > 5) return 4;
        return totalPages - 1;
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const printRow = (data) => {
    if (!loading)
      return data.map((val, i) => {
        return (
          <tr key={i} className="w-full h-full text-center">
            <th>{page * limit + i + 1}</th>
            <td>{val.created_at}</td>
            <td>{val.aktivitas}</td>
            <td>{val.petugas}</td>
            <td>{val.keluar}</td>
            <td>{val.masuk}</td>
            <td>{val.sisa}</td>
            <td></td>
          </tr>
        );
      });
  };

  const printButtons = () => {
    let pages = [];
    let buttonsTotal = totalPages;
    for (let i = 0; i < buttonsTotal; i++) {
      pages.push("");
    }
    return pages.map((val, i) => {
      return (
        <button
          key={i}
          className={`btn-plain h-8 aspect-square rounded-full ${
            page === i ? "bg-primary text-white" : ""
          }`}
          onClick={async () => {
            if (page !== i) {
              setPage(i);
            }
          }}
        >
          {i + 1}
        </button>
      );
    });
  };

  useEffect(() => {
    getProductStock();
  }, [limit, page]);

  return (
    <Transition appear show={modalProductStock} as={Fragment}>
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
              <Dialog.Panel className="w-full h-full flex flex-col  transform overflow-hidden px-8 py-4 rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="div"
                  className="h-10 w-full flex justify-center text-2xl items-center relative mb-2"
                >
                  <h1 className="font-bold">Product Stock</h1>
                  <button
                    type="button"
                    className="btn-plain text-xl rounded-full hover:text-primary hover:bg-primary/20 border flex justify-center items-center p-2 absolute right-0"
                    onClick={onClose}
                  >
                    <XIcon className="h-5" />
                  </button>
                </Dialog.Title>
                <div className="bg-admin h-full w-full justify-center flex">
                  <div className="w-full ">
                    <div className="w-full h-full border shadow-lg rounded-lg overflow-hidden shadow-black/20 p-8 flex flex-col gap-y-5">
                      <div className="h-20 w-full flex items-end">
                        <div className="flex flex-col gap-2 w-1/6 ">
                          <label htmlFor="sinceDate">Bulan</label>
                          <input
                            name="sinceDate"
                            type="date"
                            placeholder="calender"
                            className={`field-input h-10`}
                            value={sinceDate}
                            onChange={(e) => setSinceDate(e.target.value)}
                          />
                        </div>
                        <div className="flex flex-col gap-y-2 w-1/6 ml-10">
                          <label htmlFor="toDate">Tahun</label>
                          <input
                            name="toDate"
                            type="date"
                            placeholder="calender"
                            className={`field-input h-10`}
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="w-full" />
                      <div className="w-full h-[628px] flex flex-col">
                        <div className="h-[572px] border-l overflow-scroll relative">
                          {loading && (
                            <div className="w-full absolute flex items-center h-full">
                              <Loading className="" />
                            </div>
                          )}
                          <table className="w-full rounded-t-lg overflow-hidden table-fixed table-zebra">
                            <thead className="rounded-t-lg h-12">
                              <tr className="text-center font-normal bg-secondary rounded-t-lg">
                                <th className="font-medium text-white w-full">
                                  No
                                </th>
                                <th className="font-medium text-white w-full">
                                  Tanggal
                                </th>
                                <th className="font-medium text-white w-full">
                                  Aktivitas
                                </th>
                                <th className="font-medium text-white w-full">
                                  Petugas
                                </th>
                                <th className="font-medium text-white w-full">
                                  Keluar
                                </th>
                                <th className="font-medium text-white w-full">
                                  Masuk
                                </th>
                                <th className="font-medium text-white w-full">
                                  Sisa
                                </th>
                                {/* <th className="font-medium text-white w-40">
                                  Tgl.Kadaluarsa
                                </th> */}
                              </tr>
                            </thead>
                            <tbody>{printRow(productStock)}</tbody>
                          </table>
                        </div>
                        <div className="w-full h-14  flex justify-between items-center px-4 py-3">
                          <span className="">
                            Menampilkan {limit} dari {total} data
                          </span>
                          <div className="w-56 flex  h-full items-center gap-x-2">
                            Baris per halaman
                            <div className="dropdown dropdown-top dropdown-end">
                              <label
                                tabIndex="0"
                                className="h-full w-20 border border-neutral-gray p-1 rounded-lg focus:outline-primary flex gap-x-5 cursor-pointer"
                              >
                                {limit} <ChevronDownIcon className={`h-5`} />
                              </label>
                              <ul
                                tabIndex="0"
                                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full"
                              >
                                <li>
                                  <button onClick={() => setLimit(10)}>
                                    10
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => setLimit(20)}>
                                    20
                                  </button>
                                </li>
                                <li>
                                  <button onClick={() => setLimit(30)}>
                                    30
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="h-8 min-w-min flex items-center gap-x-2">
                            <button
                              className="button-outline h-7 aspect-square rounded-full"
                              onClick={() => setPage(0)}
                            >
                              <ChevronDoubleLeftIcon className="h-5" />
                            </button>
                            <button
                              className="button-primary h-full aspect-square rounded-full"
                              disabled={page === minPage}
                              onClick={() => setPage((prev) => prev - 1)}
                            >
                              <ChevronLeftIcon className="h-7" />
                            </button>
                            <div className="h-full w-full flex gap-x-2">
                              {loading && !total ? (
                                <div className="w-[250px] h-full rounded-lg bg-neutral-gray button-loading flex justify-center items-center">
                                  Loading ...
                                </div>
                              ) : (
                                printButtons()
                              )}
                            </div>
                            <button
                              className="button-primary h-full aspect-square rounded-full"
                              disabled={page === totalPages - 1}
                              onClick={() => setPage((prev) => prev + 1)}
                            >
                              <ChevronRightIcon className="h-7" />
                            </button>
                            <button
                              className="button-outline h-7 aspect-square rounded-full"
                              onClick={() => setPage(totalPages - 1)}
                            >
                              <ChevronDoubleRightIcon className="h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
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

export default ModalProductStock;
