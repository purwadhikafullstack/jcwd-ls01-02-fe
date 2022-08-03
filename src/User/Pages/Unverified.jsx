import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import Button from "../Component/Button";
import API_URL from "../../Helpers/API_URL";
import signupImage from "../../Assets/signup-image.png";
import logo from "../../Assets/logo.png";

function Unverified() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { username, id, email, verified, isLogin } = useSelector(
    (state) => state.user
  );
  const [loadingEmail, setLoadingEmail] = useState(false);

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

  const changeAccount = () => {
    Cookies.remove("token");
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  useEffect(() => {
    if (verified || !isLogin) navigate("/");
    // eslint-disable-next-line
  }, []);

  return (
    <div className="w-screen h-screen flex bg-white">
      <div className="w-1/2 h-full flex justify-center items-center relative">
        <img
          src={signupImage}
          alt=""
          className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
        <i className="w-1/6 min-h-min absolute left-10 top-10">
          <img src={logo} alt="logo" className="w-full" />
        </i>
        <img
          src={signupImage}
          alt=""
          className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="w-1/2 h-full border shadow-2xl flex">
        <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
          <div className="w-full min-h-min text-2xl font-bold">
            Halo {username}! Verifikasi akun mu dulu yuk!
          </div>
          <div className="w-full min-h-min">
            <p className="">
              Coba cek email kamu, sudah kami kirimkan email verifikasinya!
              <br />
              Ikuti instruksi di dalamnya ya!
            </p>
          </div>
          <div className="border border-t-0 border-neutral-gray w-full " />
          <div className="w-full flex gap-x-5">
            <div className="w-full flex flex-col gap-y-2">
              <p className="text-center text-sm">
                Tidak merasa menerima email?
                <br />
                Coba cek Spam atau klik tombol di bawah untuk mengirimkan ulang
                email verifikasi kamu!
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
            <div className="w-full flex flex-col gap-y-2 justify-between">
              <p className="text-center text-sm">
                Salah akun?
                <br />
                Coba kamu ganti dengan akun yang lain dengan menekan tombol di
                bawah
              </p>
              <Button
                buttonContent="Ganti Akun"
                className="text-primary button-outline"
                onClick={changeAccount}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Unverified;
