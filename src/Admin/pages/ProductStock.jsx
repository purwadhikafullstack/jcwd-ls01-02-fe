import React, { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import formatToCurrency from "../../Helpers/formatToCurrency";
import Loading from "../../User/Component/Loading";
import PopoverProduct from "../components/PopoverProduct";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

function ProductStock() {
  const initialTerms = "";
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [terms, setTerms] = useState(initialTerms);
  const [order, setOrder] = useState("ORDER BY id ASC");
  let [page, setPage] = useState(0);
  const [minPage, setMinPage] = useState(0);
  const [maxPage, setMaxPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [sinceDate, setSinceDate] = useState("");
  const [toDate, setToDate] = useState("");

  const getProductStock = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/admin/product-stock`, {
        params: { terms, page, limit, order },
      });
      setProducts(res.data.data.products);
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
            <td>{val.date}</td>
            <td>{val.aktivitas}</td>
            <td>{formatToCurrency(val.masuk)}</td>
            <td>{formatToCurrency(val.keluar)}</td>
            <td>{formatToCurrency(val.saldo)}</td>
            <td>
              <div className="h-full flex justify-center items-center gap-x-2 px-2 py-2">
                <button
                  className="button-primary h-8 w-full"
                  onClick={() => {}}
                >
                  Batalkan
                </button>
                <PopoverProduct />
              </div>
            </td>
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
    getReport();
    getProductStock();
    setSinceDate("");
    return () => {};
  }, [limit, page]);

  return (
    <div className="bg-admin h-full w-full justify-center flex">
      <div className="w-full pt-16 pl-64">
        <div className="w-full px-12 py-8 flex flex-col gap-y-9">
          <div className="w-full h-8 flex justify-between">
            <h1 className="text-xl font-bold text-secondary">Buku Kas</h1>
            <div className="flex gap-4">
              <button className="button-outline w-32 h-full">Unduh PDF</button>
              <button className="button-outline w-32 h-full">Excel</button>
            </div>
          </div>
          <div className="w-full h-[800px] border shadow-lg rounded-lg overflow-hidden shadow-black/20 p-8 flex flex-col gap-y-5">
            <div className="h-20 w-full flex items-end">
              <div className="flex flex-col gap-y-2 w-1/6">
                <label htmlFor="category">Akun Kas</label>
                <div className="mt-3">BCA xxxxxxxxxxxxx</div>
              </div>
              {/* <div className="flex flex-col gap-y-2 w-1/6 ml-10">
                <label htmlFor="category">Tanggal</label>
                <input
                  className={`field-input h-10`}
                  name="sinceDate"
                  type="date"
                  placeholder="calender"
                  value={sinceDate}
                  onChange={(e) => setSinceDate(e.target.value)}
                ></input>
              </div> */}
              <div className="flex flex-col gap-2 w-1/6 ">
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
              <div className="flex flex-col gap-y-2 w-1/6 ml-10">
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
                      <th className="font-medium text-white w-12">No</th>
                      <th className="font-medium text-white w-44">Tanggal</th>
                      <th className="font-medium text-white w-36">Aktivitas</th>
                      <th className="font-medium text-white w-36">
                        Masuk (Rp.)
                      </th>
                      <th className="font-medium text-white w-32">Keluar</th>
                      <th className="font-medium text-white w-32">Saldo</th>

                      <th className="font-medium text-white w-36">Atur</th>
                    </tr>
                  </thead>
                  <tbody>{printRow(report)}</tbody>
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
        </div>
      </div>
    </div>
  );
}

export default ProductStock;
