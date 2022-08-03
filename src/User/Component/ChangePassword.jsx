import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function ChangePassword({ changePassword, setChangePassword }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const [visibleOldPassword, setVisibleOldPassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfPassword, setVisibleConfPassword] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmationPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string()
      .min(8, "Password is too short - minimimum of 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?\^\(\)\-\_\+\=])/,
        "Must also contain uppercase, number, and special character"
      )
      .required("Password is required!"),
    confirmationPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords do not match")
      .required("Passwords do not match"),
  });

  const onSubmit1 = async (values, { setSubmitting }) => {
    try {
      console.log("Password jalan!<<<<<<<>>>>>>>");
      let token = Cookies.get("token");
      await axios.post(
        `${API_URL}/auth/change-password`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
      toast.success(`Your password has Changed!`, {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#3A7D44" },
      });
      setTimeout(() => {
        setChangePassword(false);
      }, 500);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="h-screen w-screen top-0 fixed bg-black/30 flex justify-center items-center"
      onClick={(e) => {
        setChangePassword(false);
      }}
    >
      <div
        className="h-96 aspect-square bg-white flex flex-col pt-3 gap-y-5 px-5 rounded-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/7 flex items-center font-semibold justify-between">
          Ganti Kata sandi:
          <button
            className="h-6 aspect-square flex items-center justify-center hover:bg-teal-500 hover:text-white"
            onClick={() => setChangePassword(false)}
          >
            x
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit1}
        >
          {(formik) => {
            const { handleChange, errors, touched, isValid, handleBlur } =
              formik;

            return (
              <Form>
                <div className="h-4/6 mb-3">
                  <div className="w-full relative flex flex-col justify-between gap-y-1 mb-4">
                    <label htmlFor="" className="font-bold">
                      Old Password:
                    </label>
                    <input
                      name="oldPassword"
                      placeholder="Masukan Password Lama"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visibleOldPassword ? "text" : "password"}
                      className="border h-8 rounded-md"
                    />
                    <button
                      type="button"
                      className="h-6 w-6 absolute right-3 top-8 translate-y-[5%] text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() => setVisibleOldPassword(!visibleOldPassword)}
                    >
                      {visibleOldPassword ? (
                        <BsFillEyeFill className="h-full" />
                      ) : (
                        <BsFillEyeSlashFill className="h-full" />
                      )}
                    </button>
                    {errors.oldPassword && touched.oldPassword ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs">
                        {errors.oldPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs"></div>
                    ) : null}
                  </div>

                  <div className="w-full relative flex flex-col justify-between gap-y-1 mb-4">
                    <label htmlFor="" className="font-bold">
                      New Password:
                    </label>
                    <input
                      name="newPassword"
                      placeholder="Masukan Password Baru"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visibleNewPassword ? "text" : "password"}
                      className="border h-8 rounded-md"
                    />
                    <button
                      type="button"
                      className="h-6 w-6 absolute right-3 top-8 translate-y-[5%] text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() => setVisibleNewPassword(!visibleNewPassword)}
                    >
                      {visibleNewPassword ? (
                        <BsFillEyeFill className="h-full" />
                      ) : (
                        <BsFillEyeSlashFill className="h-full" />
                      )}
                    </button>
                    {errors.newPassword && touched.newPassword ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs">
                        {errors.newPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs"></div>
                    ) : null}
                  </div>

                  <div className="w-full relative flex flex-col justify-between gap-y-1 mb-4">
                    <label htmlFor="" className="font-bold">
                      Confirmation Password:
                    </label>
                    <input
                      name="confirmationPassword"
                      placeholder="Masukan Password Konfirmasi Baru"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visibleConfPassword ? "text" : "password"}
                      className="border h-8 rounded-md"
                    />
                    <button
                      type="button"
                      className="h-6 w-6 absolute right-3 top-8 translate-y-[5%] text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() =>
                        setVisibleConfPassword(!visibleConfPassword)
                      }
                    >
                      {visibleConfPassword ? (
                        <BsFillEyeFill className="h-full" />
                      ) : (
                        <BsFillEyeSlashFill className="h-full" />
                      )}
                    </button>
                    {errors.confirmationPassword &&
                    touched.confirmationPassword ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs">
                        {errors.confirmationPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600 -bottom-4 text-xs"></div>
                    ) : null}
                  </div>
                </div>

                <div className="text-xs">
                  Kata sandi harus mengandung setidaknya 8 karakter termasuk
                  huruf besar, huruf kecil, simbol dan angka
                </div>
                <div className="h-1/6 flex justify-end items-center pt-4">
                  <button
                    className="border border-teal-500 hover:bg-teal-500 w-32 h-8 rounded-md"
                    type="submit"
                    disabled={!isValid || !changed}
                  >
                    Lanjutkan
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}

export default ChangePassword;
