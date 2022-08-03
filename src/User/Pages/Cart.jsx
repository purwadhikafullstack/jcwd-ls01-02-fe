import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "../Component/Card";
import CardCart from "../Component/CardCart";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Cookies from "js-cookie";
import Loading from "../Component/Loading";

function Cart() {
  const navigate = useNavigate();
  const { isLogin, cart, verified } = useSelector((state) => state.user);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);

  const getCart = async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.get(`${API_URL}/transaction/getcart`, {
        headers: { authorization: token },
      });
      const { data } = res.data;
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/");
    if (isLogin && !verified) return navigate("/unverified");

    getCart();
  }, [isLogin, cart]);

  const printProducts = () => {
    if (loadingProducts) {
      return <Loading className="pt-28 h-full" />;
    }
    return (
      <div className="">
        {cart.map((val, i) => {
          return <CardCart key={i} data={val} />;
        })}
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-white flex justify-center pt-20 overflow-hidden">
      <div className="container h-full flex flex-col px-24 py-11">
        <div className="text-xl font-extrabold">Keranjang Saya</div>
        <div className="w-full mt-9 flex gap-x-16">
          <div className="flex flex-col px-10 w-4/6 bg-white rounded-md">
            <div className="h-20 w-full border-b-[.5px] border-black pt-7">
              <input type="checkbox" /> Pilih Semua
            </div>
            {printProducts()}
          </div>
          <div className="w-2/6 h-full border border-putih flex flex-col p-7 bg-white rounded-md">
            <div className="h-full w-full bg-white flex flex-col gap-y-11">
              <div className="text-base mb-1 font-semibold">Total</div>
              <div className="text-base mb-5 text-gray-500">Sub Total</div>
              <div className="text-base mb-3 font-semibold">Total</div>
              <button
                className="text-base border bg-teal-500 hover:bg-teal-700 text-white h-10 rounded-md"
                onClick={() => navigate("/checkout")}
              >
                Bayar
              </button>
            </div>
          </div>
        </div>
        <div className="w-full border-t-[.5px] border-blackh-20 bg-white rounded-xl flex py-28 mt-28 relative">
          <div className="absolute left-3 top-10 text-xl font-extrabold">
            Produk Terkait
          </div>
          {/* <Card /> */}
        </div>
      </div>
    </div>
  );
}

export default Cart;
