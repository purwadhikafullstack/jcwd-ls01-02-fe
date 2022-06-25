import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import Button from "../Component/Button";
import signupImage from "../Assets/signup-image.png";
import successImage from "../Assets/success-image.png";
import ForgotPasswordModal from "../Component/ForgotPasswordModal";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useParams();
  const [loading, setLoading] = useState(true);
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [tokenAlive, setTokenAlive] = useState(false);
  const [verification, setVerification] = useState(false);
  const [failed, setFailed] = useState(false);
  const { username, id, email, verified } = useSelector((state) => state.user);
  const [forgotPasswordModal, forgotPasswordModalHandler] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const [passVis, setPassVis] = useState(false);
  const [passConfVis, setPassConfVis] = React.useState(false);
  console.log(succeed);
  const initialValues = {
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password is too short - minimimum of 8 characters.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Must also contain uppercase, number, and special character."
      )
      .required("Password is required!"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords do not match.")
      .required("Passwords do not match."),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post(
        `${API_URL}/auth/change-password`,
        { password: values.password },

        {
          headers: {
            authorization: `${token} verif`,
          },
        }
      );

      setSubmitting(false);
      setTimeout(() => {
        setSucceed(true);
        navigate("/login");
        toast.success("Password Changed!", {
          position: "top-center",
          theme: "colored",
          style: { backgroundColor: "#3A7D44" },
        });
      }, 250);
    } catch (error) {
      console.log(error);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    (async function tokenCheck() {
      try {
        await axios.get(`${API_URL}/auth/token-password`, {
          headers: {
            authorization: `${token} verif`,
          },
        });
        setTokenAlive(true);
        setSucceed(true);
      } catch (error) {
        console.log(error);
        setFailed(true);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {forgotPasswordModal && (
        <ForgotPasswordModal
          forgotPasswordModal={forgotPasswordModal}
          forgotPasswordModalHandler={forgotPasswordModalHandler}
        />
      )}
      <div className="w-screen h-screen flex bg-white">
        <div className="w-1/2 h-full flex justify-center items-center relative">
          <i
            className="w-1/6 min-h-min border border-neutral-gray border-1 hover:bg-white cursor-pointer absolute left-10 top-10"
            onClick={() => navigate("/home")}
          >
            Logo
          </i>
          {loading && (
            <img
              src={signupImage}
              alt=""
              className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
          {failed && (
            <img
              src={signupImage}
              alt=""
              className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}

          {verification && (
            <img
              src={successImage}
              alt=""
              className="min-h-min object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          )}
        </div>
        <div className="w-1/2 h-full flex shadow-2xl">
          <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
            {loading && (
              <>
                <div className="w-full min-h-min text-2xl font-bold">
                  Tunggu sebentar ya!
                </div>
                <div className="w-full min-h-min">
                  <p className="">Kami sedang memverifikasi akun mu</p>
                </div>
                <div className="border border-t-0 border-neutral-gray w-full " />
                <div className="w-full flex gap-x-5 justify-center">
                  Memproses...
                </div>
              </>
            )}
            {verification && (
              <>
                <div className="w-full min-h-min text-2xl font-bold text-center">
                  Selamat! Akun mu berhasil diverifikasi!
                </div>
                <div className="w-full min-h-min text-center">
                  <p className="">
                    Kamu sudah bisa berbelanja di website kami, Selamat
                    berbelanja!
                  </p>
                </div>
                <div className="border border-t-0 border-neutral-gray w-full " />
                <div className="w-full flex gap-x-5">
                  <div className="w-full flex flex-col gap-y-2">
                    <p className="text-center text-sm">
                      Kamu akan diarahkan ke beranda sebentar lagi! <br /> Atau
                      tekan tombol di bawah untuk langsung ke Beranda!
                    </p>
                    <Button
                      disabled={loadingEmail}
                      buttonContent={"Ke Beranda"}
                      className="text-white bg-primary hover:bg-primary-dark disabled:bg-gray-600"
                      onClick={() => navigate("/home")}
                    />
                  </div>
                </div>
              </>
            )}
            {succeed && (
              <>
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
                      <Form className="flex flex-col gap-y-1">
                        {/* Password */}
                        <div className="flex flex-col relative">
                          <label htmlFor="password">Password</label>
                          <input
                            name="password"
                            placeholder="Password*"
                            type={passVis ? "text" : "password"}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            value={values.password}
                            className={
                              errors.password &&
                              touched.password &&
                              values.password.length &&
                              dirty
                                ? "p-2 px-4 outline outline-merah outline-2 rounded"
                                : "p-2 px-4 focus:outline focus:outline-biru focus:outline-2 rounded"
                            }
                          />
                          {errors.password &&
                          touched.password &&
                          dirty &&
                          values.password.length ? (
                            <div
                              name="password"
                              className="text-red-500 -mt-5 ml-2 text-xs absolute px-2 -bottom-5 pointer-events-none"
                            >
                              {errors.password}
                            </div>
                          ) : null}
                          <div
                            className="w-7 h-7 right-2  top-7 absolute cursor-pointer overflow-hidden"
                            onClick={() => setPassVis(!passVis)}
                          >
                            {passVis ? <EyeIcon /> : <EyeOffIcon />}
                          </div>
                        </div>
                        {/* Confirm Password */}
                        <div className="flex flex-col relative mt-5">
                          <label htmlFor="passwordConfirm">
                            Confirm Password
                          </label>
                          <input
                            name="passwordConfirm"
                            placeholder="Confirm Password"
                            type={passConfVis ? "text" : "password"}
                            onChange={(e) => {
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                            value={values.passwordConfirm}
                            className={
                              errors.passwordConfirm &&
                              values.passwordConfirm.length &&
                              dirty
                                ? "p-2 px-4 outline outline-merah outline-2 rounded"
                                : "p-2 px-4 focus:outline focus:outline-biru focus:outline-2 rounded"
                            }
                          />
                          {errors.passwordConfirm &&
                          dirty &&
                          values.passwordConfirm.length ? (
                            <div
                              name="passwordConfirm"
                              className="text-red-500 -mt-5 ml-2 text-xs absolute px-2 -bottom-5 pointer-events-none"
                            >
                              {errors.passwordConfirm}
                            </div>
                          ) : null}
                          <div
                            className="w-7 h-7 right-2  top-7 absolute cursor-pointer overflow-hidden"
                            onClick={() => {
                              setPassConfVis(!passConfVis);
                            }}
                          >
                            {passConfVis ? <EyeIcon /> : <EyeOffIcon />}
                          </div>
                        </div>

                        {/* Button Submit */}
                        <div className="mt-5 flex items-center justify-between">
                          <button
                            type="submit"
                            disabled={!dirty || !isValid || isSubmitting}
                            className={`justify-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
                      focus-visible:ring-biru duration-500
                      hover:text-putih shadow-md hover:shadow-black text-putih bg-white border-transparent
                      disabled disabled:shadow-none disabled:border-merah disabled:text-black disabled:cursor-not-allowed
                    }`}
                          >
                            Change Password
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </>
            )}

            {failed && (
              <>
                <div className="w-full min-h-min text-2xl font-bold">
                  Aduh.. Ada yang salah dengan verifikasi mu!
                </div>
                <div className="w-full min-h-min">
                  <p className="">
                    Ada yang salah dengan proses memverifikasi akun mu
                  </p>
                </div>
                <div className="border border-t-0 border-neutral-gray w-full " />
                <div className="w-full flex gap-x-5">
                  <div className="w-full flex flex-col gap-y-2 justify-between">
                    <p className="text-center text-sm">
                      Coba kirimkan ulang email verifikasi kamu dengan menekan
                      tombol di bawah!
                    </p>
                    <Button
                      disabled={loadingEmail}
                      buttonContent={
                        loadingEmail
                          ? "Sedang Mengirim ..."
                          : "Kirim Ulang Email"
                      }
                      className="text-white bg-primary hover:bg-primary-dark disabled:bg-gray-600"
                      onClick={() => forgotPasswordModalHandler(true)}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
