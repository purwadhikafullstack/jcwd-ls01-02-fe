import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Field, Form } from "formik";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import * as Yup from "yup";
import Button from "./Button";
import FormikControl from "./Formik/FormikControl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "./Loading";

function EditAddress(props) {
  const {
    data,
    switchModal,
    setDataAddresses,
    loadingAllAddress,
    setLoadingAllAddress,
  } = props;
  const {
    id,
    alamat,
    kode_kota,
    kode_provinsi,
    kode_pos,
    label,
    nama_belakang,
    nama_depan,
    nomor_hp,
    primary_address,
  } = data;
  const dispatch = useDispatch();
  const [provinceId, setProvinceId] = useState(kode_provinsi);
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([
    { content: "Kota/Kabupaten", value: 0 },
  ]);
  const [cityId, setCityId] = useState(kode_kota);

  const initialValues = {
    label,
    nama_depan,
    nama_belakang,
    nomor_hp,
    provinsi: kode_provinsi,
    kota: kode_kota,
    alamat,
    kode_pos,
    primaryAddress: primary_address,
  };

  const validationSchema = Yup.object({
    label: Yup.string().required("Wajib diisi"),
    nama_depan: Yup.string()
      .required("Wajib diisi")
      .matches(/^[A-Za-z ]+$/, "Hanya menggunakan huruf"),
    nama_belakang: Yup.string()
      .required("Wajib diisi")
      .matches(/^[A-Za-z ]+$/, "Hanya menggunakan huruf"),
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
      setProvinces([{ content: "Provinsi", value: "" }, ...data]);
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
      setLoadingAllAddress(true);
      let token = Cookies.get("token");
      let insertData = { ...values, id };
      const res = await axios.patch(
        `${API_URL}/profile/edit-address`,
        insertData,
        {
          headers: { authorization: token },
        }
      );
      toast.success(`Pengubahan alamat berhasil`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      if (res.data.data?.primary) {
        dispatch({
          type: "CHANGEADDRESS",
          payload: res.data.data?.primary,
        });
      }
      setDataAddresses(res.data.data.addresses);
      switchModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAllAddress(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    getProvince();
    getCity();

    // eslint-disable-next-line
  }, [provinceId, cityId]);

  return loadingAllAddress ? (
    <Loading className="h-full" />
  ) : (
    <div className="flex flex-col gap-y-2 px-2 pb-2">
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
              dirty,
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
                    defaultValue={values.label}
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
                      defaultValue={values.nama_depan}
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
                      defaultValue={values.nama_belakang}
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
                    defaultValue={values.nomor_hp}
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
                      }}
                      value={values.provinsi}
                      options={provinces}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
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
                      value={values.kota}
                      options={cities}
                      onBlur={handleBlur}
                      type="text"
                      className={`${
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
                      defaultValue={values.kode_pos}
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
                    defaultValue={values.alamat}
                    type="text"
                    className={`${
                      errors.alamat && touched.alamat ? "outline-red-700" : null
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
                    onClick={switchModal}
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
                    disabled={isSubmitting || !dirty}
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
  );
}

export default EditAddress;
