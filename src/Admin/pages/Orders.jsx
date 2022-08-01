import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import searchIcon from "../../Assets/search-icon.png";
import Loading from "../../User/Component/Loading";
import API_URL from "../../Helpers/API_URL";
import CardOrderAdmin from "../components/CardOrderAdmin";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { printCategory } from "../../Helpers/categoryList";

function Orders() {
  const params = useParams();
  const { status } = params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [terms, setTerms] = useState("");
  const [sinceDate, setSinceDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [order, setOrder] = useState("ORDER BY o.id DESC");

  const getOrders = async () => {
    try {
      setLoading(true);
      let res = await axios.get(
        `${API_URL}/admin/orders/${status.split("_").join("-")}`,
        {
          params: { terms, sinceDate, toDate, page, limit, order },
        }
      );
      setData(res.data.data.orders);
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

  const printOrders = (data) => {
    return data.map((val, i) => {
      return <CardOrderAdmin data={val} key={i} getOrders={getOrders} />;
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
    setSinceDate("");
    setToDate("");
    setTerms("");
    getOrders();
    return () => {};
  }, [status, limit, page]);

  useEffect(() => {
    if (sinceDate || toDate) getOrders();
  }, [sinceDate, toDate]);

  return (
    <div className="min-h-screen w-full flex bg-admin">
      <div className="w-full pt-16 pl-64">
        <div className="w-full flex flex-col gap-y-9">
          <div className="w-full -translate-x-64 flex flex-col gap-y-9 pr-12 pl-80 py-8 bg-admin fixed z-10">
            <div className="w-full h-8 flex justify-between">
              <h1 className="text-xl font-bold text-secondary">
                {printCategory(status.split("-").join(" "))}
              </h1>
              <div className="flex gap-4">
                <button className="button-outline w-32 h-full">
                  Unduh PDF
                </button>
                <button className="button-outline w-32 h-full">Excel</button>
              </div>
            </div>
            <div className="w-full flex flex-col gap-y-2">
              <div className="flex h-full items-end gap-x-5 bg-adm">
                <div className="flex flex-col gap-y-2">
                  <label htmlFor="terms">
                    Cari Nama Pelanggan / No. Transaksi
                  </label>
                  <div className="w-80 flex h-10 rounded-lg overflow-hidden border bg-white">
                    <input
                      type="text"
                      name="terms"
                      id="terms"
                      className="filter-search-bar"
                      placeholder="Nama Pelanggan / No. Transaksi"
                      value={terms}
                      onChange={(e) => setTerms(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") getOrders();
                      }}
                    />
                    <button
                      className="btn-plain h-full object-cover flex rounded-r-lg bg-primary border border-primary"
                      onClick={() => {
                        if (terms !== "") {
                          setPage(0);
                          getOrders();
                        }
                      }}
                    >
                      <SearchIcon className="h-full scale-50 text-white" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 w-1/6">
                  <label htmlFor="sinceDate">Dari Tanggal</label>
                  <input
                    name="sinceDate"
                    type="date"
                    placeholder="calender"
                    className={`field-input h-10`}
                    value={sinceDate}
                    onChange={(e) => setSinceDate(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-2 w-1/6">
                  <label htmlFor="toDate">Sampai Tanggal</label>
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
              <div className="w-full h-14 flex justify-between items-center px-4 py-3">
                <span className="">Pilih Semua</span>
                <div className="w-59 flex h-full items-center gap-x-2">
                  Kartu per halaman
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
                        <button onClick={() => setLimit(10)}>10</button>
                      </li>
                      <li>
                        <button onClick={() => setLimit(20)}>20</button>
                      </li>
                      <li>
                        <button onClick={() => setLimit(30)}>30</button>
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
          <div className="w-full flex flex-col gap-y-5 px-12 pb-5 pt-72">
            {loading ? <Loading className="pt-56" /> : printOrders(data)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
