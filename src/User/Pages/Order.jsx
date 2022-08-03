import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PengecekanResep from "../Component/PengecekanResep";
import PesananDiterima from "../Component/PesananDiterima";
import MenungguPembayaran from "../Component/MenungguPembayaran";
import Diproses from "../Component/Diproses";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Cookies from "js-cookie";
import Loading from "../Component/Loading";
import Dibatalkan from "../Component/Dibatalkan";
import Dikirim from "../Component/Dikirim";
import Selesai from "../Component/Selesai";

function Order() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const transaction_code = searchParams.get("id");
  const { isLogin, verified } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [timer, setTimer] = useState(0);

  const getOrderDetails = async () => {
    try {
      setLoading(true);
      let token = Cookies.get("token");
      const res = await axios.get(`${API_URL}/transaction/order-details`, {
        headers: { authorization: token },
        params: { transaction_code },
      });
      setData(res.data.data);
    } catch (error) {
      console.log(error);
      setError(true);
      setTimer(5);
    } finally {
      setLoading(false);
    }
  };

  const timerCountdown = () => {
    setTimer(timer - 1);
  };

  const printPage = (data) => {
    let { status } = data.dataOrder;
    switch (status) {
      case "Pengecekan-Resep":
        return <PengecekanResep data={data} />;
      case "Pesanan-Diterima":
        return <PesananDiterima data={data} />;
      case "Menunggu-Pembayaran":
        return (
          <MenungguPembayaran data={data} getOrderDetails={getOrderDetails} />
        );
      case "Diproses":
        return <Diproses data={data} />;
      case "Dibatalkan":
        return <Dibatalkan data={data} />;
      case "Dikirim":
        return <Dikirim data={data} getOrderDetails={getOrderDetails} />;
      case "Selesai":
        return <Selesai data={data} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/");
    if (isLogin && !verified) return navigate("/unverified");
    if (isLogin && !error) getOrderDetails();
    let interval;
    if (timer > 0) {
      interval = setInterval(timerCountdown, 1000);
    }
    if (timer === 0 && error) {
      navigate("/");
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [isLogin, timer]);

  return (
    <>
      <div className="min-h-[500px] w-full bg-white flex justify-center items-center pt-20">
        <div className="container h-full flex flex-col px-80 py-16 gap-y-10 justify-center items-center">
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="w-full flex flex-col gap-y-2">
              <p className="text-center text-sm">
                Kamu mengakses order yang bukan milik kamu! <br /> Kamu akan
                diarahkan ke beranda dalam{" "}
                <span className="font-bold text-primary">{timer}</span>
              </p>
            </div>
          ) : (
            printPage(data)
          )}
        </div>
      </div>
    </>
  );
}

export default Order;
