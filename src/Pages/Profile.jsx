import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { toast } from "react-toastify";
import unknown from "../Assets/unknownpeople.png";
import ChangePassword from "../Component/ChangePassword";

function Profile() {
  const navigate = useNavigate();
  const { id, username, email } = useSelector((state) => state.user);
  const { isLogin } = useSelector((state) => state.user);
  let [tab, setTab] = useState(1);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  useEffect(() => {
    if (!isLogin) navigate("/home");
    // eslint-disable-next-line
  }, [isLogin]);

  const sendEmail = async () => {
    try {
      setLoadingEmail(true);
      await axios.post(`${API_URL}/auth/email-verification`, {
        id,
        username,
        email,
      });
      toast.success("Email sent!");
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingEmail(false);
    }
  };

  return (
    <>
      {changePassword && (
        <ChangePassword
          changePassword={changePassword}
          setChangePassword={setChangePassword}
        />
      )}
      <div className="h-full w-full bg-green-200 flex justify-center">
        <div className="container h-full flex px-24 py-14 gap-x-11">
          <div className="w-80 bg-white flex flex-col px-10">
            <button className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600">
              Jane Doe
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(1)}
            >
              Profil
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(2)}
            >
              Proses Pemesanan
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(3)}
            >
              Metode Pembayaran
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(4)}
            >
              Alamat Pengiriman
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(5)}
            >
              Favorite
            </button>
            <button
              className="w-full h-20 flex items-center border border-1 border-green-600 hover:bg-green-600"
              onClick={() => setTab(6)}
            >
              Pesan Bantuan
            </button>
          </div>
          <div className="w-full h-[550px] bg-white">
            {tab === 1 && (
              <div className="w-full h-full flex flex-col gap-y-5">
                <div className="w-full text-lg font-semibold px-11 mt-5">
                  Edit Profile
                </div>
                <div className="w-full text-center">baris</div>
                <div className="flex justify-start px-9">
                  <div className="w-1/4">
                    <img src={unknown} className="w-full h-52 mb-3" />
                    <button className="w-full border rounded-md h-9 mb-3 hover:bg-teal-500">
                      Pilih Foto
                    </button>
                    <div className="text-xs mb-3">
                      Besar file: Maksimum 5 mb. Extensi file yang
                      diperbolehkan: JPG, JPEG & PNG
                    </div>
                    <button
                      disabled={loadingEmail}
                      className="border border-1 hover:bg-teal-500 disabled:bg-gray-500 mb-3 w-full rounded-md h-9"
                      onClick={sendEmail}
                    >
                      Send Email Verification
                    </button>
                    <button
                      className="w-full border rounded-md h-9 hover:bg-teal-500"
                      onClick={() => {
                        setChangePassword(true);
                      }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
                <div className="w-3/4"></div>
              </div>
            )}

            {tab === 2 && <> Proses Pemesanan</>}
            {tab === 3 && <>Metode Pembayaran</>}
            {tab === 4 && <>Alamat Pengiriman</>}
            {tab === 5 && <>Favorite</>}
            {tab === 6 && <>Pesan Bantuan</>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
