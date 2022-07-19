import React, { useState } from "react";
import Loading from "../../User/Component/Loading";
import formatToCurrency from "../../Helpers/formatToCurrency";
import {
  categoryList,
  golonganList,
  satuanList,
} from "../../Helpers/categoryList";
import { shortDateGenerator } from "../../Helpers/dateGenerator";

function DetailsPreview(props) {
  const { details1, details2, detailImage, setModalState, finalSubmit } = props;
  const {
    name,
    NIE,
    category,
    golongan,
    tgl_kadaluarsa,
    indikasi,
    komposisi,
    cara_penyimpanan,
    principal,
    cara_pakai,
    peringatan,
  } = details1;
  const { stock, satuan, kemasan, price, modal, promo, berat } = details2;
  const { photo } = detailImage;
  const catList = ["", ...categoryList.map((val) => val.cardText)];
  const golList = ["", ...golonganList.map((val) => val.content)];
  const satList = ["", ...satuanList.map((val) => val.content)];
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      await finalSubmit();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`${
          loading ? "h-[200px]" : ""
        } w-full flex flex-col justify-center duration-500 `}
      >
        {loading ? (
          <Loading className={``} />
        ) : (
          <>
            <div className="h-16 border-b-2 flex items-center">
              <div className="text-md breadcrumbs">
                <ul>
                  <li className="w-full flex items-center gap-x-2">
                    <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                      1
                    </span>
                    Detail Obat
                  </li>
                  <li className="w-full flex items-center gap-x-2">
                    <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                      2
                    </span>
                    Detail Kuantitas & Harga
                  </li>
                  <li className="w-full flex items-center gap-x-2">
                    <span className="rounded-full bg-neutral-gray font-bold text-white h-6 aspect-square text-center">
                      3
                    </span>
                    Gambar Produk
                  </li>
                  <li className="w-full flex items-center gap-x-2">
                    <span className="rounded-full bg-primary font-bold text-white h-6 aspect-square text-center">
                      4
                    </span>
                    Konfirmasi
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 items-center pt-3">
              <figure className="w-52 h-52 border border-primary rounded-lg overflow-hidden">
                <img src={photo.filePreview} alt="" className="h-full" />
              </figure>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Nama Produk</span>
                <span className="w-3/5">{name}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Nomor Izin Edar</span>
                <span className="w-3/5">{NIE}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Kategori Produk</span>
                <span className="w-3/5">{catList[category]}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Golongan Produk</span>
                <span className="w-3/5">{golList[golongan]}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Tanggal Kadaluarsa</span>
                <span className="w-3/5">
                  {shortDateGenerator(tgl_kadaluarsa)}
                </span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Indikasi Produk</span>
                <span className="w-3/5">{indikasi}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Komposisi Produk</span>
                <span className="w-3/5">{komposisi}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Cara Penyimpanan</span>
                <span className="w-3/5">{cara_penyimpanan}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Principal</span>
                <span className="w-3/5">{principal}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Cara Pakai</span>
                <span className="w-3/5">{cara_pakai}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Peringatan</span>
                <span className="w-3/5">{peringatan}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Kuantitas</span>
                <span className="w-3/5">{stock}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Satuan</span>
                <span className="w-3/5">{satList[satuan]}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Kemasan</span>
                <span className="w-3/5">{kemasan}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Harga Jual</span>
                <span className="w-3/5">{formatToCurrency(price)}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Harga Barang</span>
                <span className="w-3/5">{formatToCurrency(modal)}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Potongan Promo</span>
                <span className="w-3/5">{formatToCurrency(promo)}</span>
              </div>
              <div className="w-full flex">
                <span className="w-2/5 font-bold">Berat</span>
                <span className="w-3/5">{berat} gram</span>
              </div>
            </div>
          </>
        )}
      </div>
      {loading ? (
        ""
      ) : (
        <div className="w-full flex justify-end h-20 items-center border-t-2 gap-x-5">
          <div
            role="button"
            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
            onClick={() => setModalState(3)}
          >
            Kembali
          </div>
          <button
            type="button"
            className={`button-primary px-10 text-lg disabled:bg-gray-500 disabled:cursor-not-allowed ${""}`}
            onClick={onSubmit}
          >
            Konfirmasi
          </button>
        </div>
      )}
    </>
  );
}

export default DetailsPreview;
