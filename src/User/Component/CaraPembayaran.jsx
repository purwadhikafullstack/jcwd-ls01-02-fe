import { ChevronDownIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

function CaraPembayaran({ data, name }) {
  const [disclosure, setDisclosure] = useState(false);
  return (
    <div
      className={`w-full relative duration-300 border-b border-neutral-gray ${
        disclosure ? "h-[312px]" : "h-20"
      }`}
    >
      <button
        className={`button-left-bar justify-between z-20 px-4 border-y border-neutral-gray ${
          disclosure ? "text-primary" : ""
        }`}
        onClick={() => {
          setDisclosure(!disclosure);
        }}
      >
        <div className="flex w-full gap-x z-20 justify-start items-center gap-x-2">
          {data}
        </div>
        <ChevronDownIcon
          className={`h-5 duration-300 ${disclosure ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`w-full flex flex-col absolute duration-300 pointer-events-auto ${
          disclosure ? "z-0" : "-translate-y-full -z-10"
        }`}
      >
        <div className="p-5">
          <ol className="list-decimal ml-5">
            <li>{`Masukkan Kartu ATM ${name} & PIN.`}</li>
            <li>{`Pilih menu Transaksi Lainnya > Transfer > ke Rekening ${name} Virtual Account.`}</li>
            <li>
              Masukkan 5 angka kode perusahaan untuk HealthyMed (80123) dan
              Nomor HP yang kamu daftarkan di akun HealthyMed (Contoh:
              80123081316951940).
            </li>
            <li>
              Di halaman konfirmasi, pastikan detil pembayaran sudah sesuai
              seperti No VA, Nama, Perus/Produk dan Total Tagihan.
            </li>
            <li>
              Pastikan nama kamu dan Total Tagihannya benar. Jika sudah benar,
              klik Ya.
            </li>
            <li>Simpan struk transaksi sebagai bukti pembayaran.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default CaraPembayaran;
