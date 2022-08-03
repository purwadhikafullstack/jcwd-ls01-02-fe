import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Card from "../Component/Card";
import FilterLeftBar from "../Component/FilterLeftBar";
import Loading from "../Component/Loading";
import API_URL from "../../Helpers/API_URL";
import { printCategory } from "../../Helpers/categoryList";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import SelectCustom from "../../Admin/components/SelectCustom";
import FilterMobile from "../Component/FilterMobile";
import NavbarProductsMobile from "../Component/NavbarProductsMobile";
import { useSelector } from "react-redux";

function Category() {
  const navigate = useNavigate();
  const { isLogin, verified } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [order, setOrder] = useState("ORDER BY name ASC");
  const [orderShow, setOrderShow] = useState("A-Z");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);
  const params = useParams();
  let { category } = params;
  const limit = 24;

  const listOrder = [
    { content: "A-Z", value: "ORDER BY name ASC" },
    { content: "Z-A", value: "ORDER BY name DESC" },
    { content: "Harga Terendah", value: "ORDER BY price ASC" },
    { content: "Harga Tertinggi", value: "ORDER BY price DESC" },
  ];

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      category = category.split("_").join(" ");
      if (category === "all") {
        category = "semua";
      }
      let res = await axios.get(
        `${API_URL}/product/products/${category}?order=${order}&page=${page}&limit=${limit}`
      );
      const { products, total } = res.data.data;
      setTotal(total);
      setTotalPages(() => Math.ceil(res.data.data.total / limit));
      setProducts(products);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const printOrderOptions = () => {
    return listOrder.map((val, i) => {
      return (
        <button
          key={i}
          className="btn-plain py-2 hover:bg-primary hover:text-white"
          onClick={() => {
            setPage(0);
            setOrder(val.value);
            setOrderShow(val.content);
          }}
        >
          {val.content}
        </button>
      );
    });
  };

  const printProducts = () => {
    if (loadingProducts) {
      return <Loading className="pt-28 h-full" />;
    }
    return (
      <div className="w-full h-full container grid grid-cols-2 2xl:grid-cols-4 md:grid-cols-3  gap-3 lg:gap-x-10 lg:gap-y-6">
        {products.map((val, i) => {
          return <Card key={i} data={val} imgStyling="h-36" />;
        })}
      </div>
    );
  };

  const printButton = () => {
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
    if (isLogin && !verified) return navigate("/unverified");

    window.scrollTo(0, 0);
    fetchProducts();
    return () => {
      window.scrollTo(0, 0);
    };
    // eslint-disable-next-line
  }, [order, page, category]);

  return (
    <div className="h-full w-full pt-5 md:pt-20 pb-14 lg:pb-0">
      <NavbarProductsMobile />
      <div className="h-10 w-60 lg:hidden bg-primary fixed flex bottom-10 left-1/2 -translate-x-1/2 z-50 rounded-lg overflow-hidden">
        <button className="button-primary h-full w-1/2 bg-primary">
          Urutkan
        </button>
        <div className="h-5 border-r border-white z-10 my-2" />
        <button className="button-primary h-full w-1/2 bg-primary">
          Saringkan
        </button>
      </div>
      <div className="h-full w-ful bg-white flex justify-center relative">
        <div className="container h-full flex flex-col px-6 lg:px-24 py-11">
          <div className="text-md breadcrumbs hidden md:block">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li className="text-primary font-bold">
                {printCategory(category)}
              </li>
            </ul>
          </div>
          <div className="w-full mt-9 flex gap-x-12">
            <div className="w-full h-full flex flex-col">
              <div className="w-full mt-0 md:mt-9 flex gap-x-12">
                <FilterLeftBar
                  category={category}
                  setPage={setPage}
                  setOrder={setOrder}
                  setOrderShow={setOrderShow}
                />
                <div className="w-full h-full flex flex-col gap-y-5">
                  <FilterMobile
                    category={category}
                    setPage={setPage}
                    setOrder={setOrder}
                    setOrderShow={setOrderShow}
                  />
                  <div className="h-11 hidden md:block text-3xl font-bold text-secondary">
                    {category && category === "all"
                      ? `${printCategory(category)} Kategori`
                      : printCategory(category)}
                  </div>
                  <div className="w-full hidden md:block border-b border-neutral-gray" />
                  <div className="w-full h-9 mt-2 mb-2 flex justify-between items-center">
                    <div>
                      {loadingProducts ? "..." : total} Produk{" "}
                      {category && category === "all"
                        ? ""
                        : `di ${printCategory(category)}`}
                    </div>
                    <div className="hidden lg:flex gap-x-4 items-center">
                      <span>Urutkan</span>
                      <SelectCustom
                        buttonStyle="w-44 h-10"
                        panelStyle="w-44 h-10"
                        optionsFunc={printOrderOptions}
                        stateValue={orderShow}
                      />
                    </div>
                  </div>
                  <div className="w-full h-full bg-white">
                    {printProducts()}
                  </div>
                  <div className="flex justify-end">
                    {loadingProducts ? (
                      ""
                    ) : (
                      <div className="h-8 min-w-min flex items-center gap-x-2">
                        <button
                          className="button-outline h-7 aspect-square rounded-full"
                          onClick={() => setPage(0)}
                        >
                          <ChevronDoubleLeftIcon className="h-5" />
                        </button>
                        <button
                          className="button-primary h-full aspect-square rounded-full"
                          disabled={page === 0}
                          onClick={() => setPage((prev) => prev - 1)}
                        >
                          <ChevronLeftIcon className="h-7" />
                        </button>
                        <div className="h-full w-full flex gap-x-2">
                          {loadingProducts ? (
                            <div className="w-[250px] h-full rounded-lg bg-neutral-gray button-loading flex justify-center items-center">
                              Loading ...
                            </div>
                          ) : (
                            printButton()
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
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
