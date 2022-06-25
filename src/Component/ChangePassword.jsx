import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";

function ChangePassword({ changePassword, setChangePassword }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);

  const initialValues = {
    oldPassword: "",
    newPassword: "",
    confirmationPassword: "",
  };

  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old Password is required"),
    newPassword: Yup.string().required("Your New Password is required"),
    confirmationPassword: Yup.string().required(
      "Confirmation password is Required"
    ),
  });

  const onSubmit = async (values, onSubmit) => {
    try {
      console.log("Password jalan!<<<<<<<>>>>>>>");
      let token = Cookies.get("token");
      await axios.post(
        `${API_URL}/auth/change-password-profile`,
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmationPassword: values.confirmationPassword,
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
      onSubmit.setSubmitting(false);
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
        className="h-96 aspect-square bg-white flex flex-col pt-3 gap-y-5 px-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1/7 flex items-center font-semibold justify-between">
          Ganti Kata sandi:
          <button
            className="h-6 aspect-square border border-gray-700 flex items-center justify-center hover:bg-gray-700"
            onClick={() => setChangePassword(false)}
          >
            x
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            const {
              handleChange,
              errors,
              touched,
              isSubmitting,
              isValid,
              values,
              dirty,
              handleBlur,
            } = formik;

            return (
              <Form>
                <div className="h-4/6 mb-3">
                  <div>
                    <div className="text-sm mb-2">Old Password:</div>
                    <input
                      type="password"
                      className={
                        errors.oldPassword &&
                        touched.oldPassword &&
                        values.oldPassword.length &&
                        dirty &&
                        !changed
                          ? "w-full border h-8 rounded-sm text-sm mb-2"
                          : "w-full border h-8 rounded-sm text-sm mb-2"
                      }
                      placeholder="Masukan Kata Sandi Lama"
                      name="oldPassword"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={values.oldPassword}
                    />
                    {errors.oldPassword &&
                    touched.oldPassword &&
                    dirty &&
                    values.oldPassword.length ? (
                      <div name="oldPassword" className="absolute text-red-600">
                        {errors.oldPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>

                  <div>
                    <div className="text-sm mb-2">New Password:</div>
                    <input
                      type="password"
                      className={
                        errors.newPassword &&
                        touched.newPassword &&
                        values.newPassword.length &&
                        dirty &&
                        !changed
                          ? "w-full border h-8 rounded-sm text-sm mb-2"
                          : "w-full border h-8 rounded-sm text-sm mb-2"
                      }
                      placeholder="Masukan Kata Sandi Baru"
                      name="newPassword"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={values.newPassword}
                    />
                    {errors.newPassword &&
                    touched.newPassword &&
                    dirty &&
                    values.newPassword.length ? (
                      <div name="newPassword" className="absolute text-red-600">
                        {errors.newPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>

                  <div>
                    <div className="text-sm mb-2">Confirmation Password:</div>
                    <input
                      type="password"
                      className={
                        errors.confirmationPassword &&
                        touched.confirmationPassword &&
                        values.confirmationPassword.length &&
                        dirty &&
                        !changed
                          ? "w-full border h-8 rounded-sm text-sm mb-2"
                          : "w-full border h-8 rounded-sm text-sm mb-2"
                      }
                      placeholder="Masukan Kata Sandi Baru"
                      name="confirmationPassword"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      value={values.confirmationPassword}
                    />
                    {errors.confirmationPassword &&
                    touched.confirmationPassword &&
                    dirty &&
                    values.confirmationPassword.length ? (
                      <div
                        name="confirmationPassword"
                        className="absolute text-red-600"
                      >
                        {errors.confirmationPassword}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600"></div>
                    ) : null}
                  </div>
                </div>

                <div className="text-xs mb-2">
                  Kata sandi harus mengandung setidaknya 8 karakter termasuk
                  huruf besar, huruf kecil, simbol dan angka
                </div>
                <div className="h-1/6 flex justify-end items-center">
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
