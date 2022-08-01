import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Button from "../Component/Button";
import signupImage from "../../Assets/signup-image.png";
import successImage from "../../Assets/success-image.png";
import logo from "../../Assets/logo.png";
import Cookies from "js-cookie";

function Verification() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, id, email, verified } = useSelector((state) => state.user);
  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [verification, setVerification] = useState(false);
  const [doneVerify, setdoneVerify] = useState(false);
  const [failed, setFailed] = useState(false);
  const [timer, setTimer] = useState(0);

  const verifying = async () => {
    try {
      if (verified) {
        navigate("/");
      }
      setLoading(true);
      let res = await axios.get(`${API_URL}/auth/verification`, {
        headers: {
          authorization: `${token} verif`,
        },
      });
      dispatch({ type: "LOGIN", payload: res.data.data });
      setVerification(true);
      setTimer(10);
    } catch (error) {
      setFailed(true);
      console.log(error);
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { backgroundColor: "#FF6B6B" },
      });
    } finally {
      setLoading(false);
      setdoneVerify(true);
    }
  };

  const sendEmail = async () => {
    try {
      setLoadingEmail(true);
      await axios.post(`${API_URL}/auth/email-verification`, {
        id,
        username,
        email,
      });
      toast.success(`Email verifikasi telah dikirim!`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  const timerCountdown = () => {
    setTimer(timer - 1);
  };

  useEffect(() => {
    if (!doneVerify) verifying();
    let interval;
    if (timer > 0) {
      interval = setInterval(timerCountdown, 1000);
    }
    if (timer === 0 && verification) {
      navigate("/");
    }
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [timer]);

  const changeAccount = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="w-screen h-screen flex bg-white">
      <div className="w-1/2 h-full flex justify-center items-center relative">
        <i className="w-1/6 min-h-min absolute left-10 top-10">
          <img src={logo} alt="logo" className="w-full" />
        </i>
        {loading && (
          <img
            src={signupImage}
            alt=""
            className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {failed && (
          <img
            src={signupImage}
            alt=""
            className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
        {verification && (
          <img
            src={successImage}
            alt=""
            className="min-h-min object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        )}
      </div>
      <div className="w-1/2 h-full flex shadow-2xl">
        <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
          {loading && (
            <>
              <div className="w-full min-h-min text-2xl font-bold">
                Tunggu sebentar ya!
              </div>
              <div className="w-full min-h-min">
                <p className="">Kami sedang memverifikasi akun mu</p>
              </div>
              <div className="border border-t-0 border-neutral-gray w-full " />
              <div className="w-full flex gap-x-5 justify-center">
                Memproses...
              </div>
            </>
          )}
          {verification && (
            <>
              <div className="w-full min-h-min text-2xl font-bold text-center">
                Selamat! Akun mu berhasil diverifikasi!
              </div>
              <div className="w-full min-h-min text-center">
                <p className="">
                  Kamu sudah bisa berbelanja di website kami, Selamat
                  berbelanja!
                </p>
              </div>
              <div className="border border-t-0 border-neutral-gray w-full " />
              <div className="w-full flex gap-x-5">
                <div className="w-full flex flex-col gap-y-2">
                  <p className="text-center text-sm">
                    Kamu akan diarahkan ke beranda dalam{" "}
                    <span className="font-bold text-primary">{timer}</span>{" "}
                    <br /> Atau tekan tombol di bawah untuk langsung ke Beranda!
                  </p>
                  <Button
                    disabled={loadingEmail}
                    buttonContent={"Ke Beranda"}
                    className="button-primary"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>
            </>
          )}
          {failed && (
            <>
              <div className="w-full min-h-min text-2xl font-bold">
                Aduh.. Ada yang salah dengan verifikasi mu!
              </div>
              <div className="w-full min-h-min">
                <p className="">
                  Ada yang salah dengan proses memverifikasi akun mu
                </p>
              </div>
              <div className="border border-t-0 border-neutral-gray w-full " />
              <div className="w-full flex gap-x-5">
                <div className="w-full flex flex-col gap-y-2 justify-between">
                  <p className="text-center text-sm">
                    Coba kirimkan ulang email verifikasi kamu dengan menekan
                    tombol di bawah!
                  </p>
                  <Button
                    disabled={loadingEmail}
                    buttonContent={
                      loadingEmail ? "Sedang Mengirim ..." : "Kirim Ulang Email"
                    }
                    className={`button-primary disabled:bg-gray-600 ${
                      loadingEmail && "button-loading"
                    }`}
                    onClick={sendEmail}
                  />
                </div>
                <div className="h-full relative flex justify-center items-center">
                  <div className="border border-l-0 border-neutral-gray h-full absolute" />
                  <div className="py-5 leading-none z-10 min-h-min bg-white">
                    atau
                  </div>
                </div>
                <div className="w-full flex flex-col gap-y-2">
                  <p className="text-center text-sm">
                    Salah akun?
                    <br />
                    Coba kamu ganti dengan akun yang lain dengan menekan tombol
                    di bawah
                  </p>
                  <Button
                    buttonContent="Ganti Akun"
                    className="button-outline"
                    onClick={changeAccount}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Verification;
