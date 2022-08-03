import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../Helpers/API_URL";
import { HeartIcon } from "@heroicons/react/solid";
import formatToCurrency from "../../Helpers/formatToCurrency";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import defaultProduct from "../../Assets/default-product.png";

function Card({ data, imgStyling }) {
  const { isLogin } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const link = data.name.split(" ").join("_");
  const params = useParams();
  const productId = params.id;

  const addtoCart = async () => {
    try {
      let token = Cookies.get("token");
      let res = await axios.post(
        `${API_URL}/transaction/addtocart`,
        {
          productId: data.id,
          quantity: 1,
        },
        { headers: { authorization: token } }
      );
      toast.success("Product berhasil dimasukan kedalam Cart!", {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#009B90" },
      });
      dispatch({
        type: "ADDTOCART",
        payload: res.data.data,
      });
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <div
      className="h-full relative bg-white border p-2 sm:p-5 flex flex-col rounded-xl shadow-custom-lg items-center gap-y-3 cursor-pointer hover:-translate-y-2 hover:shadow-primary/50 duration-300"
      onClick={() => navigate(`/category/${data.category}/${link}`)}
    >
      <button
        className="btn-plain rounded-full p-2 border flex justify-center items-center bg-white absolute right-3 shadow-md hover:shadow-primary/50 hover:bg-white"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <HeartIcon className="text-neutral-gray h-5 sm:h-8" />
      </button>
      <div className="flex flex-col items-start w-full">
        <figure className="w-full flex justify-center">
          <img
            src={data.photo ? API_URL + data.photo : defaultProduct}
            alt={defaultProduct}
            className={`${imgStyling} aspect-square`}
          />
        </figure>
        <div className="flex flex-col gap-y-2 text-secondary w-full">
          <h2 className="text-left font-bold text-sm h-10 overflow-hidden">
            {data.name}
          </h2>
          <h3 className="flex flex-col w-full gap-y-1">
            <span className="flex gap-x-5 items-center">
              <span className="text-danger font-semibold border-2 border-danger text-xs rounded p-1">{`${data.promo}%`}</span>{" "}
              <span className="line-through text-neutral-gray text-sm">
                {formatToCurrency(data.initPrice)}
              </span>
            </span>
            <span className="flex justify-between">
              {formatToCurrency(data.price)}
              <span>/Strip</span>
            </span>
          </h3>
        </div>
      </div>
      <button
        className="btn-plain border-2 text-sm border-primary rounded-lg text-primary font-bold w-full py-1 hover:bg-primary/20"
        onClick={(e) => {
          e.stopPropagation();
          if (!isLogin) {
            navigate("/login");
          }
          addtoCart();
        }}
      >
        Keranjang
      </button>
    </div>
  );
}

export default Card;
