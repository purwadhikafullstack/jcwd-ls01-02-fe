import React from "react";

function Dashboard() {
  return (
    <div className="bg-red-500 h-full w-full justify-center flex">
      <div className="bg-[#f1f5fc] w-screen pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="mb-8">
            <div className="w-full mb-4">
              <div className="w-full h-6 text-lg font-bold">
                Analisis Produk dan Toko
              </div>
              <div className="w-full h-5 text-sm">
                Update terakhir: 20 Januari 2022, 14.30 WIB
              </div>
            </div>
            <div className="flex justify-between h-32">
              <div className="w-80 bg-white border px-4 rounded-md">
                <div className="w-full font-semibold mb-3 mt-3">
                  Profit Hari ini
                </div>
                <div className="w-full h-7 text-xl mb-3 font-bold">
                  Rp. 10.213.500
                </div>
                <div className="text-xs text-green-700 font-bold">
                  +5.700.000
                </div>
              </div>
              <div className="w-80 bg-white border px-4 rounded-md">
                <div className="w-full font-semibold mb-3 mt-3">
                  Total Pemesanan Hari ini
                </div>
                <div className="w-full h-7 text-xl mb-3 font-bold">110</div>
                <div className="text-xs text-orange-500 font-bold">-60</div>
              </div>
              <div className="w-80 bg-white border px-4 rounded-md">
                <div className="w-full font-semibold mb-3 mt-3">
                  Sisa stok Hari ini
                </div>
                <div className="w-full h-7 text-xl mb-3 font-bold">5.980</div>
                <div className="text-xs text-green-700 font-bold">+1.200</div>
              </div>
            </div>
          </div>
          <div className="flex mb-8">
            <div className="w-1/2 h-54">
              <div className="mb-4">
                <div className="text-lg font-bold">PENTING HARI INI</div>
                <div className="text-sm">
                  Aktivitas yang perlu kamu ketahui untuk menjaga kepuasan
                  pelanggan
                </div>
              </div>
              <div className="flex justify-between h-24">
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Pesanan Baru</div>
                  <div className="text-2xl font-bold pt-2">7</div>
                </div>
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Siap Dikirim</div>
                  <div className="text-2xl font-bold pt-2">3</div>
                </div>
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Sedang Dikirim</div>
                  <div className="text-2xl font-bold pt-2">0</div>
                </div>
              </div>
              <div className="flex justify-between h-24 mt-4">
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Selesai</div>
                  <div className="text-2xl font-bold pt-2">7</div>
                </div>
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Dibatalkan</div>
                  <div className="text-2xl font-bold pt-2">3</div>
                </div>
                <div className="w-40 bg-white border px-6 pt-3 rounded-md">
                  <div className="text-sm font-semibold">Chat Baru</div>
                  <div className="text-2xl font-bold pt-2">0</div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-54 mx-4">
              <div className="mb-4">
                <div className="text-lg font-bold">KADALUWARSA OBAT</div>
                <div className="text-sm">
                  Cek tanggal kadaluwarsa untuk mengorginisir stok obat
                </div>
              </div>
              <div className="w-80">
                <div className="h-52 bg-white border rounded-md">
                  <div className="flex justify-between pt-11 px-4">
                    <div className="font-semibold">Telah Kadaluwarsa</div>
                    <div className="text-lg text-red-600 font-bold">17</div>
                  </div>
                  <div className="flex justify-between pt-4 px-4">
                    <div className="font-semibold">Kadaluwarsa Bulan Ini</div>
                    <div className="text-lg text-yellow-300 font-bold">0</div>
                  </div>
                  <div className="flex justify-between pt-4 px-4">
                    <div className="font-semibold">
                      Kadaluwarsa 3 bulan kedepan
                    </div>
                    <div className="text-lg text-teal-600 font-bold">3</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="bg-white w-96 h-[283px] border">GRAFIK</div>
            <div className="bg-white w-96 h-[283px] border">GRAFIK</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
