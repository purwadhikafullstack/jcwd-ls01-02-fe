import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import succesImage from "../../Assets/success-image.png";
import Button from "../Component/Button";
import DefaultPicture from "../../Assets/default-upload.png";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";

function Prescription() {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const { isLogin, verified } = useSelector((state) => state.user);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [selectedImage, setselectedImage] = useState({
    file: [],
    filePreview: null,
  });

  const onFileChange = (e) => {
    if (e.target && e.target.files[0]) {
      setselectedImage({
        ...selectedImage,
        file: e.target.files[0],
        filePreview: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const submitPhoto = async () => {
    try {
      let formData = new FormData();
      formData.append("prescription_photo", selectedImage.file);
      let token = Cookies.get("token");
      await axios.post(`${API_URL}/transaction/upload-resep`, formData, {
        headers: {
          authorization: token,
        },
      });
      toast.success(`Resep berhasil ditambahkan`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      setUploadSuccess(true);
      if (selectedImage.file.length == 0) {
        throw "Please select images to submit!";
      } else {
        setselectedImage({ ...selectedImage, file: [] });
      }
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { backgroundColor: "#EB1D36" },
      });
    }
  };
  useEffect(() => {
    if (!isLogin) navigate("/home");
    if (isLogin && !verified) return navigate("/unverified");
  }, [isLogin]);

  if (uploadSuccess) {
    return (
      <div className="h-full w-screen bg-white flex justify-center items-center pt-20">
        <div className="container h-[500px] w-[400px] flex flex-col justify-between items-center bg-white py-10">
          <img src={succesImage} alt="" />
          <div className="font-bold text-xl mt-4">Unggah Resep Berhasil</div>
          <div className="flex text-center text-sm">
            Kamu akan mendapat notifikasi apabila resep doktermu dikonfirmasi
            oleh admin.
          </div>
          <button
            className="bg-primary hover:bg-teal-500 text-white disabled:bg-gray-600 text-sm mt-4 w-1/2 h-1/4 rounded-lg"
            onClick={() => navigate("/myaccount/orders?status=all")}
          >
            Lihat progres pemesanan
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="h-full w-screen bg-white flex justify-center">
        return (
        <div className="container h-full flex flex-col px-52 py-14 gap-y-9">
          <div className="w-full bg-white flex flex-col gap-y-2 mt-10">
            <div className="w-full h-7 flex items-center ml-3 text-xl">
              Kirim resep
            </div>
            <div className="w-full h-6 flex items-center ml-3 -mt-2 text-xs">
              Tak perlu antre & obat langsung dikirimkan ke lokasi anda !
              <div className="font-bold ml-1">
                Foto tidak boleh lebih dari 10 MB.
              </div>
            </div>
          </div>
          <div className="w-full h-[550px] drop-shadow-2xl rounded-lg bg-white flex px-16 py-7">
            <div className="w-full ">
              Unggah Resep Dokter
              <div className="w-full h-[400px] rounded-xl px-6 border-dashed border-4 bg-white border-grey mt-5">
                <div className="w-1/3 aspect-square overflow-hidden items-center ml-80">
                  {selectedImage.filePreview ? (
                    <img
                      src={selectedImage.filePreview}
                      className="w-full h-42 mt-5 object-cover items-center justify-center"
                    />
                  ) : null}
                </div>
                <div className="">
                  {" "}
                  <input
                    className="hidden"
                    type="file"
                    id="prescription_photo"
                    onChange={onFileChange}
                  />
                  <label
                    htmlFor="prescription_photo"
                    type="button"
                    className="w-1/3 justify-center border h-full mb-3 ml-80 bg-primary text-white hover:bg-teal-500 text-center mt-5"
                  >
                    Pilih File
                  </label>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  type="submit"
                  buttonContent={loadingSubmit ? "Loading.." : "Save Changes"}
                  className={`bg-primary hover:bg-teal-500 text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm w-1/5 h-11 rounded-md ${"loading"}`}
                  onClick={() => submitPhoto()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Prescription;
