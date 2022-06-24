import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-screen justify-center flex bg-white">
      <div className="container flex">
        <div className="w-1/2 h-full border flex border-red-600">
          <div className="bg-white m-auto h-[650px] w-[580px]">LOGO</div>
        </div>
        <div className="w-1/2 h-full flex">
          <div className="bg-white m-auto h-[650px] w-[580px]">
            <div className="flex justify-end mb-12">
              <button className="border w-11 h-7 bg-gray-200 text-teal-600 rounded-sm">
                EN
              </button>
              <button className="border w-11 h-7 bg-teal-600 text-white rounded-sm">
                ID
              </button>
            </div>
            <div>
              <div className="w-full mb-9">
                <div className="w-16 h-7 font-extrabold">Masuk</div>
              </div>
              <div className="mb-4">
                <div className="w-9 h-5 mb-1">Email</div>
                <input
                  className="w-full h-10 border rounded-sm border-gray-300"
                  type="text"
                  placeholder="Masukan Email"
                />
              </div>
              <div className="mb-3">
                <div className="w-9 h-5 mb-1">Password</div>
                <input
                  className="w-full h-10 border rounded-sm border-gray-300"
                  type="password"
                  placeholder="Masukan Password"
                />
              </div>
              <div className="flex justify-between mb-9">
                <input type="checkbox" name="Ingat Saya?" />
                <button>Lupa Kata Sandi?</button>
              </div>
              <div className="w-full flex justify-center mb-12">
                <button
                  className="w-full h-12 border bg-teal-600 text-white rounded-md"
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Masuk
                </button>
              </div>
              <div className="flex justify-center w-full mb-11">
                <div className="w-full text-center">Atau Masuk Dengan</div>
              </div>
              <div className="flex justify-center w-full mb-12">
                <button className="w-full h-12 border border-teal-600 text-center rounded-md font-bold">
                  Masuk Dengan Google
                </button>
              </div>
              <div className="flex justify-center w-full">
                <div>
                  Belum Punya Akun?
                  <button className="font-bold text-teal-600"> Daftar </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
