import React, { useState, useEffect } from "react";
import { RiDeleteBin5Fill } from "react-icons/ri";
import API_URL from "../../Helpers/API_URL";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function CardCart({ data }) {
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const { cart, value } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteCart = async (id) => {
    try {
      let token = Cookies.get("token");
      setLoadingProducts(true);
      const res = await axios.delete(
        `${API_URL}/transaction/deleteproduct?productId=${id}`,
        {
          headers: { authorization: token },
        }
      );
      dispatch({ type: "DELETECART", payload: res.data.data });
      toast.success("Product berhasil dihapus!", {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#009B90" },
      });

      const { data } = res.data;
      setProducts(data);
      // setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const editQuantity = async () => {
    try {
      let token = Cookies.get("token");
      setLoadingProducts(true);
      const res = await axios.patch(`${API_URL}/transaction/editquantity`, {
        headers: { authorization: token },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingProducts(false);
    }
  };

  const incrementQuantity = () => setQuantity(quantity + 1);
  let decrementQuantity = () => setQuantity(quantity - 1);

  if (quantity <= 1) {
    decrementQuantity = () => setQuantity(1);
  }

  return (
    <div className="h-47 w-full border rounded-lg flex gap-x-6 mb-5 border-teal-600">
      <div className="flex-col w-full mx-3">
        <div className="flex h-1/2 w-full justify-between pt-8">
          <input type="checkbox" className="" />
          <img
            className="aspect-square w-1/4"
            src={API_URL + data.photo}
            alt=""
          />
          {/* <div>{data.id}</div> */}
          <div className="w-1/4 text-sm font-medium pt-5">{data.name}</div>
          <div className="w-1/4 text-sm font-medium pt-5 flex justify-around">
            <div className="line-through text-gray-400">{data.promo}</div>
            <div>{data.price}</div>
          </div>
        </div>
        <div className="flex h-1/2 w-full justify-between">
          <button className="w-1/3 text-xs h-9 mt-9 text-center text text-teal-600 hover:text-teal-700">
            Pindah ke Wishlist
          </button>
          <button className="w-10 h-8 justify-center flex mt-9 pt-2">
            <RiDeleteBin5Fill
              className="text-teal-600 text-lg hover:text-teal-700"
              onClick={() => deleteCart(data.id)}
            />
          </button>
          <div className="flex w-1/3 justify-center pt-10">
            <button
              className="w-10 h-6 text-teal-600 border rounded-sm bg-gray-100 font-bold hover:text-teal-700"
              onClick={decrementQuantity}
            >
              -
            </button>
            <div className="w-10 h-6 text-teal-600 text-center border rounded-sm bg-gray-100 text-sm">
              {quantity}
            </div>
            <button
              className="w-10 h-6 text-teal-600 border rounded-sm bg-gray-100 font-bold hover:text-teal-700"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardCart;
