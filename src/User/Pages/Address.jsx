import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import * as Yup from "yup";
import Button from "../Component/Button";
import FormikControl from "../Component/Formik/FormikControl";
import { newAddressAction } from "../../Redux/Reducers/Actions/UserActions";

function Address() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, verified } = useSelector((state) => state.user);
  const [provinceId, setProvinceId] = useState(0);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([
    { content: "Kota/Kabupaten", value: 0 },
  ]);
  const [cityId, setCityId] = useState(0);

  const initialValues = {
    label: "",
    nama_depan: "",
    nama_belakang: "",
    nomor_hp: "",
    provinsi: "",
    kota: "",
    alamat: "",
    kode_pos: "",
    primaryAddress: false,
  };

  const validationSchema = Yup.object({
    label: Yup.string().required("Wajib diisi"),
    nama_depan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    nama_belakang: Yup.string()
      .required("Wajib diisi")
      .matches(/^[a-zA-Z ]*$/, "Hanya menggunakan huruf"),
    nomor_hp: Yup.string()
      .required("Wajib diisi")
      .matches(/^[0-9]*$/, "Hanya menggunakan angka"),
    provinsi: Yup.string().required("Wajib diisi"),
    kota: Yup.string().required("Wajib diisi"),
    kode_pos: Yup.string()
      .required("Wajib diisi")
      .length(5, "Format kode pos tidak sesuai"),
    alamat: Yup.string().required("Wajib diisi"),
  });

  const getProvince = async () => {
    try {
      let res = await axios.get(`${API_URL}/raja-ongkir/provinces`);
      let data = res.data.data.map((val) => {
        return { value: val.id, content: val.province };
      });
      setProvinces([{ content: "Provinsi", value: 0 }, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const getCity = async () => {
    try {
      let res = await axios.get(
        `${API_URL}/raja-ongkir/cities?province_id=${provinceId}`
      );
      let data = res.data.data.map((val) => {
        return { value: val.id, content: val.city, kode_pos: val.postal_code };
      });
      setCities([{ content: "Kota/Kabupaten", value: 0 }, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      dispatch({ type: "LOADING" });
      await dispatch(newAddressAction(values));
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!isLogin) navigate("/");
    if (isLogin && !verified) navigate("/unverified");
    if (!provinces[0]) getProvince();
    if (provinceId) getCity();

    // eslint-disable-next-line
  }, [provinceId, cityId]);

  return (
    <div className="h-full w-full flex justify-center pt-20">
      <div className="container h-full flex flex-col px-10 sm:px-40 xl:px-96 py-24 gap-y-16">
        <div>Alamat Pengiriman</div>
        <div className="w-full h-full flex">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const {
                handleChange,
                isSubmitting,
                isValid,
                handleBlur,
                errors,
                touched,
                values,
              } = formik;

              return (
                <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                  {/* Label*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Label Alamat"
                      name="label"
                      placeholder="Contoh: Apartemen"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.label && touched.label ? "outline-red-700" : null
                      }`}
                    />
                  </div>
                  {/* Info Penerima */}
                  <div className="w-full">Info Penerima</div>
                  <div className="w-full flex gap-x-3">
                    {/* Nama Depan*/}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="INPUT"
                        label="Nama Depan"
                        name="nama_depan"
                        placeholder="John"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type="text"
                        className={`${
                          errors.nama_depan && touched.nama_depan
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </div>{" "}
                    {/* Nama Belakang*/}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="INPUT"
                        label="Nama Belakang"
                        name="nama_belakang"
                        placeholder="Doe"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type="text"
                        className={`${
                          errors.nama_belakang && touched.nama_belakang
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </div>{" "}
                  </div>
                  {/* Nomor HP*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Nomor HP"
                      name="nomor_hp"
                      placeholder="8788888888"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`pl-14 ${
                        errors.nomor_hp && touched.nomor_hp
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                    <span className="absolute top-8 border-r border-neutral-gray w-12 h-11 flex items-center justify-center">
                      +62
                    </span>
                  </div>{" "}
                  <div className="w-full grid grid-cols-2 gap-x-3 gap-y-5">
                    {/* Provinsi*/}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="SELECT"
                        label="Provinsi"
                        name="provinsi"
                        placeholder="Provinsi"
                        onChange={(e) => {
                          handleChange(e);
                          setProvinceId(e.target.value);
                          setCityId(0);
                          values.kota = 0;
                        }}
                        options={provinces}
                        value={values.provinsi}
                        onBlur={handleBlur}
                        type="text"
                        className={`cursor-pointer ${
                          errors.provinsi && touched.provinsi
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </div>{" "}
                    {/* Kota/Kabupaten*/}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="SELECT"
                        label="Kota/Kabupaten"
                        name="kota"
                        placeholder="Contoh: Alamat"
                        onChange={(e) => {
                          handleChange(e);
                          setCityId(e.target.value);
                        }}
                        options={cities}
                        value={values.kota}
                        disabled={!provinceId}
                        onBlur={handleBlur}
                        type="text"
                        className={`cursor-pointer disabled:cursor-not-allowed ${
                          errors.kota && touched.kota ? "outline-red-700" : null
                        }`}
                      />
                    </div>{" "}
                    {/* Kode Pos */}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="INPUT"
                        label="Kode Pos"
                        name="kode_pos"
                        placeholder="Kode Pos"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type="number"
                        className={`${
                          errors.kode_pos && touched.kode_pos
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                    </div>
                  </div>
                  {/* Alamat*/}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Alamat"
                      name="alamat"
                      placeholder="Contoh: Alamat"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
                        errors.alamat && touched.alamat
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                  </div>
                  <div className="w-full relative flex items-center">
                    <Field
                      name="primaryAddress"
                      type="checkbox"
                      className={`checkbox checkbox-primary 
                      }`}
                    />
                    <label htmlFor="" className="ml-3">
                      Simpan sebagai alamat utama
                    </label>
                  </div>
                  <div className="w-full h-full flex gap-x-4">
                    <Button
                      type="button"
                      buttonContent={`Batalkan`}
                      className={`button-outline w-full text-sm leading-5
                    }`}
                      onClick={() => navigate(-1)}
                    />
                    <Button
                      type="submit"
                      buttonContent={
                        isSubmitting
                          ? "Loading.."
                          : !isValid
                          ? "Cek Kembali Data Kamu!"
                          : "Simpan Alamat"
                      }
                      disabled={isSubmitting}
                      className={`button-primary w-full disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed text-sm leading-5  ${
                        isSubmitting && "button-loading"
                      }`}
                    />
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Address;
