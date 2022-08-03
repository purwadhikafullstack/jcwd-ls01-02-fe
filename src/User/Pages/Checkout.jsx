import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import API_URL from "../../Helpers/API_URL";
import axios from "axios";
import Cookies from "js-cookie";
import CardAddress from "../Component/CardAddress";
import { toast } from "react-toastify";
import plusIcon from "../../Assets/plus-icon.png";
import ModalAllAddress from "../Component/ModalAllAddress";
import Loading from "../Component/Loading";
import formatToCurrency from "../../Helpers/formatToCurrency";
import jneIcon from "../../Assets/jne-icon.png";
import posIcon from "../../Assets/pos-icon.png";
import tikiIcon from "../../Assets/tiki-icon.png";
import SelectCustom from "../../Admin/components/SelectCustom";
import CardCartCheckout from "../Component/CardCartCheckout";
import ModalPaymentMethod from "../Component/ModalPaymentMethod";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const transaction_code = searchParams.get("id");
  const { isLogin, address_id, verified } = useSelector((state) => state.user);
  const [loadingPrimaryAddress, setLoadingPrimaryAddress] = useState(true);
  const [loadingCourier, setLoadingCourier] = useState(false);
  const [loadingCart, setLoadingCart] = useState(false);
  const [destinationId, setDestinationId] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [weight, setWeight] = useState(1000);
  const [courier, setCourier] = useState("");
  const [courierShow, setCourierShow] = useState("Pilih Kurir");
  const [courierImage, setCourierImage] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedMethodCost, setSelectedMethodCost] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [dataAddress, setDataAddress] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [checkoutCart, setCheckoutCart] = useState([]);
  const [dataCart, setDataCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalPaymentMethod, setModalPaymentMethod] = useState(false);
  const [error, setError] = useState(false);
  const originId = "152";

  const listCourier = [
    { content: "Pilih Kurir", value: "" },
    { content: "JNE", value: "jne" },
    { content: "TIKI", value: "tiki" },
    { content: "POS Indonesia", value: "pos" },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const openMethodModal = () => {
    setDataAddress(createAddress(selectedAddress));
    setModalPaymentMethod(true);
  };

  const getPrimaryAddress = async (data) => {
    try {
      let token = Cookies.get("token");
      setLoadingPrimaryAddress(true);
      const res = await axios.get(`${API_URL}/profile/primary-address`, {
        headers: { authorization: token },
        params: { address_id: data },
      });
      if (res.data.data?.primary_address)
        dispatch({
          type: "CHANGEADDRESS",
          payload: res.data.data?.primary_address,
        });
      setSelectedAddress(res.data.data);
      setDestinationId(res.data.data.destination);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPrimaryAddress(false);
    }
  };
  const getCartPrescription = async () => {
    try {
      setLoadingCart(true);
      let token = Cookies.get("token");
      const res = await axios.get(
        `${API_URL}/transaction/get-cart-prescription`,
        {
          headers: { authorization: token },
          params: { transaction_code },
        }
      );
      const { status, id, cartData, checkoutCart, totalBerat } = res.data.data;
      if (status !== "Pesanan-Diterima") {
        navigate("/");
      }
      setDataCart(cartData);
      setOrderId(id);
      setCheckoutCart(checkoutCart);
      if (totalBerat > 1000) {
        setWeight(totalBerat);
      }
      let totalPrice = 0;
      const carts = cartData;
      for (const cart of carts) {
        totalPrice += cart.price * cart.qty;
      }
      setSubTotal(totalPrice);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCart(false);
    }
  };

  const getCost = async () => {
    try {
      setLoadingCourier(true);
      const res = await axios.post(`${API_URL}/raja-ongkir/cost`, {
        origin: originId,
        destination: destinationId,
        weight,
        courier,
      });
      setDeliveryMethod(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingCourier(false);
    }
  };

  const printDeliveryMethod = (data) => {
    return data.map((val, i) => {
      return (
        <div className="w-full relative" key={i}>
          <table className="w-full grid grid-col-2 mb-3 pb-3 border-b border-neutral-gray">
            <tbody>
              <tr>
                <th className="text-left pr-5 text-primary">
                  Jenis Pengiriman
                </th>
                <td>:</td>
                <td className="text-left pl-5">{val.jenis}</td>
              </tr>
              <tr>
                <th className="text-left pr-5 text-primary">
                  Durasi Pengiriman
                </th>
                <td>:</td>
                <td className="text-left pl-5">{val.durasi} hari</td>
              </tr>
              <tr>
                <th className="text-left pr-5 text-primary">Harga</th>
                <td>:</td>
                <td className="text-left pl-5">
                  {formatToCurrency(val.harga)}
                </td>
              </tr>
            </tbody>
          </table>
          {selectedMethod?.jenis !== val.jenis ? (
            <button
              onClick={() => {
                setSelectedMethod(val);
                setSelectedMethodCost(val.harga);
                setError(false);
              }}
              className="button-primary px-5 absolute right-2 top-2"
            >
              Pilih Pengiriman
            </button>
          ) : (
            <span className="text-primary font-bold text-sm absolute right-2 top-2 pointer-events-none">
              Pengiriman yang dipilih
            </span>
          )}
        </div>
      );
    });
  };

  const pilihPembayaran = () => {
    if (selectedAddress && selectedMethod) {
      openMethodModal();
    } else {
      setError(true);
      toast.error("Lengkapi pemesanan mu dulu yuk!", {
        theme: "colored",
        style: { backgroundColor: "#EB1E4A" },
      });
    }
  };

  const printCartCard = () => {
    return dataCart.map((val, i) => {
      return (
        <div key={i} className="w-full">
          <CardCartCheckout data={val} />
          <div className="w-full border-t border-neutral-gray" />
        </div>
      );
    });
  };

  const printCourierOptions = () => {
    return listCourier.map((val, i) => {
      return (
        <button
          key={i}
          className={`py-2 ${
            i !== 0 ? "btn-plain hover:bg-primary hover:text-white" : ""
          }`}
          disabled={i === 0}
          onClick={() => {
            setCourier(val.value);
            setCourierShow(val.content);
            if (courier !== val.value) {
              setSelectedMethod(null);
              setSelectedMethodCost(0);
            }
          }}
        >
          {val.content}
        </button>
      );
    });
  };

  const createAddress = (data) => {
    return `${data.nama_depan} ${data.nama_belakang}, +62${data.nomor_hp}, ${data.label}, ${data.alamat}, ${data.kota}, ${data.provinsi}, ${data.kode_pos}`;
  };

  useEffect(() => {
    if (!isLogin) navigate("/");
    if (isLogin && !verified) return navigate("/unverified");
    if (!selectedAddress) getPrimaryAddress(address_id);

    if (courier) {
      getCost();
      if (courier === "jne") {
        setCourierImage(jneIcon);
      } else if (courier === "tiki") {
        setCourierImage(tikiIcon);
      } else if (courier === "pos") {
        setCourierImage(posIcon);
      }
    }

    if (transaction_code && !dataCart.length) {
      getCartPrescription();
    }
    // eslint-disable-next-line
  }, [courier]);

  return (
    <>
      <ModalAllAddress
        setError={setError}
        isOpen={isOpen}
        selectedAddress={selectedAddress}
        closeModal={closeModal}
        setSelectedAddress={setSelectedAddress}
        setCourier={setCourier}
        setCourierShow={setCourierShow}
        setSelectedMethod={setSelectedMethod}
        setSelectedMethodCost={setSelectedMethodCost}
        setDestinationId={setDestinationId}
      />
      <ModalPaymentMethod
        modalPaymentMethod={modalPaymentMethod}
        setModalPaymentMethod={setModalPaymentMethod}
        totalPrice={subTotal + selectedMethodCost}
        cart={dataCart}
        dataAddress={dataAddress}
        selectedMethod={selectedMethod}
        id={orderId}
        checkoutCart={checkoutCart}
        transaction_code={transaction_code}
      />
      <div className="h-full w-screen  flex justify-center pt-20">
        <div className="container h-full flex flex-col px-24 py-11">
          <div className="w-full flex gap-x-16">
            <div className="flex flex-col gap-y-7 w-4/6">
              <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg bayangan p-5 border">
                <div className="flex gap-x-5 items-end">
                  <h1 className="h-6 w-fot font-bold text-secondary text-xl">
                    Alamat Pengiriman
                  </h1>
                  {!selectedAddress && error && (
                    <span className="text-error text-sm">
                      Pilih alamat terlebih dahulu sebelum memilih metode
                      pembayaran
                    </span>
                  )}
                </div>
                <div className="border-b border-neutral-gray w-full" />
                {!selectedAddress ? null : (
                  <div className="min-h-min w-full p-2 relative">
                    {loadingPrimaryAddress ? (
                      <Loading className="py-10" />
                    ) : (
                      <>
                        <CardAddress data={selectedAddress} />
                        <button
                          h="addresses"
                          className="button-general py-0 outline-0 text-primary font-bold absolute top-2 right-2 modal-button cursor-pointer"
                          onClick={openModal}
                        >
                          Pilih alamat lain
                        </button>
                        <div className="border-b border-neutral-gray w-full mt-3" />
                      </>
                    )}
                  </div>
                )}
                <div className="flex gap-x-5">
                  <button
                    className="button-outline px-5 flex justify-between gap-x-2 rounded-full shadow-lg mt-3"
                    onClick={() => navigate("/address")}
                  >
                    <img src={plusIcon} alt="" className="h-7 aspect-square" />
                    Tambah Alamat Baru
                  </button>
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
                <h1 className="h-6 w-full font-bold text-secondary text-xl">
                  Ringkasan Order
                </h1>
                <div className="w-full h-full flex flex-col items-center gap-y-4 border-t border-neutral-gray ">
                  {loadingCart ? (
                    <Loading className="py-10" />
                  ) : (
                    printCartCard()
                  )}
                </div>
              </div>
              <div className="w-full h-full flex flex-col items-start gap-y-3 rounded-lg p-5 bayangan border">
                <div className="flex gap-x-5 items-end">
                  <h1 className="h-6 w-fit font-bold text-secondary text-xl">
                    Pilih Metode Pengiriman{" "}
                  </h1>
                  {!selectedMethod && error && (
                    <span className="text-error text-sm">
                      Pilih metode pengiriman terlebih dahulu sebelum memilih
                      metode pembayaran
                    </span>
                  )}
                </div>
                <div className="w-full h-full flex justify-start items-center gap-x-5 border-y border-neutral-gray py-3">
                  <SelectCustom
                    buttonStyle="w-44 h-10"
                    panelStyle="w-44 h-10"
                    disabled={!selectedAddress}
                    optionsFunc={printCourierOptions}
                    stateValue={courierShow}
                  />

                  {courier && (
                    <img
                      src={courierImage}
                      alt={courierImage}
                      className="h-11"
                    />
                  )}
                </div>
                <div className="h-full w-full">
                  {!courier ? (
                    ""
                  ) : loadingCourier ? (
                    <Loading className="h-full" />
                  ) : (
                    printDeliveryMethod(deliveryMethod)
                  )}
                </div>
              </div>
            </div>
            <div className="w-2/6 h-full  flex flex-col p-7 border rounded-lg bayangan">
              <div className="h-full w-full bg-white flex flex-col gap-y-5">
                <h1 className="h-6 w-full font-bold text-secondary text-xl">
                  Total
                </h1>
                <table>
                  <tbody>
                    <tr>
                      <th className="text-left font-normal">Sub Total</th>
                      <td className="text-right font-bold">
                        {formatToCurrency(subTotal)}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left font-normal">Pengiriman</th>
                      <td className="text-right font-bold">
                        {formatToCurrency(selectedMethodCost)}
                      </td>
                    </tr>
                    <tr>
                      <th className="text-left h-10"></th>
                      <td className="text-left"></td>
                    </tr>
                    <tr className="border-y border-neutral-gray h-16">
                      <th className="text-left">Total</th>
                      <td className="text-right font-bold text-primary">
                        {formatToCurrency(subTotal + selectedMethodCost)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="w-full flex flex-col items-start">
                  <h1 className="font-bold text-xl">Metode Pembayaran</h1>
                  <p className="text-sm">
                    Silahkan pilih metode pembayaran anda di sini
                  </p>
                </div>
                <button
                  className="button-primary text-sm modal-button"
                  onClick={pilihPembayaran}
                >
                  Pilih Metode Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
