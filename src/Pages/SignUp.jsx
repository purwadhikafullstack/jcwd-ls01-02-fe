import { Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "../Component/Button";
import profileIcon from "../Assets/profile-icon.png";
import emailIcon from "../Assets/email-icon.png";
import passwordIcon from "../Assets/password-icon.png";
import signupImage from "../Assets/signup-image.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import facebookIcon from "../Assets/facebook-icon.png";
import googleIcon from "../Assets/google-icon.png";
import logoImage from "../Assets/logo-1.png";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error_mes } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [changed, setChanged] = useState(false);

  let message = [];
  if (error_mes) {
    message = error_mes.split(",");
  }

  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(4, "Username harus terdiri dari 4-15 karakter")
      .max(15, "Username harus terdiri dari 4-15 karakter")
      .matches(/^[a-zA-Z0-9]+$/, "Gunakan hanya alfabet dan angka")
      .required("Username wajib diisi"),
    email: Yup.string()
      .email("Email format tidak sesuai")
      .required("Email wajib diisi"),
    password: Yup.string()
      .min(8, "Password terlalu pendek - minimum 8 karakter")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=])[A-Za-z\d@$!%*?&]/,
        "Harus menganduk huruf besar, angka, dan karakter spesial (e.g. !@#$)"
      )
      .required("Password wajib diisi"),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      message = [];
      setChanged(false);
      dispatch({ type: "LOADING" });
      let res = await axios.post(`${API_URL}/auth/register`, values);
      console.log(res.data);
      dispatch({ type: "LOGIN", payload: res.data });
      Cookies.set("token", res.headers["x-token-access"]);
      toast.success(`welcome ${values.username}`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      setTimeout(() => {
        navigate("/unverified");
      }, 1000);
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
      dispatch({ type: "DONE" });
      setSubmitting(false);
    }
  };
  return (
    <div className="w-screen h-screen flex bg-white">
      <div className="w-1/2 h-full flex justify-center items-center relative">
        <i
          className="w-1/6 min-h-min  border-neutral-gray border-1 z-10 hover:bg-white cursor-pointer absolute left-10 top-10"
          onClick={() => navigate("/home")}
        >
          <img src={logoImage} alt="" />
        </i>
        <img
          src={signupImage}
          alt=""
          className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="w-1/2 h-full border flex shadow-2xl">
        <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
          <div className="w-full min-h-min text-2xl font-bold">
            Mari Kita Mulai Ya
          </div>
          <div className="w-full min-h-min text-neutral-gray">
            Sudah punya akun?{" "}
            <span>
              <Link
                to="/login"
                className="text-primary underline underline-offset-2"
              >
                Masuk
              </Link>
            </span>
          </div>
          <div className="w-full min-h-min flex flex-col gap-y-5">
            <div className="w-full h-1/2">
              <div className="w-full h-11 flex items-center gap-x-4">
                <Button
                  type="button"
                  className="button-general outline-neutral-gray relative gap-x-3"
                  buttonContent={
                    <>
                      <img
                        src={googleIcon}
                        alt=""
                        className="h-5 aspect-square"
                      />{" "}
                      Daftar dengan Google
                    </>
                  }
                />
                <Button
                  type="button"
                  className="button-general bg-facebook text-white relative gap-x-3"
                  buttonContent={
                    <>
                      <img
                        src={facebookIcon}
                        alt=""
                        className="h-5 aspect-square"
                      />{" "}
                      Daftar dengan Facebook
                    </>
                  }
                />
              </div>
            </div>
            <div className="w-full h-full relative flex justify-center items-center">
              <div className="border border-t-0 border-neutral-gray w-full absolute" />
              <div className="px-5 leading-none z-10 min-h-min bg-white">
                atau
              </div>
            </div>
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
                <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    {/* Username */}
                    <label htmlFor="username">Username</label>
                    <input
                      name="username"
                      placeholder="JohnDoe"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`field-input pl-14`}
                    />
                    <img
                      src={profileIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-11"
                    />
                    {errors.username && touched.username ? (
                      <div className="absolute text-red-600 -bottom-6">
                        {errors.username}
                      </div>
                    ) : null}
                    {message[0] && !changed ? (
                      <div className="absolute text-red-600 -bottom-6">
                        {message[0]}
                      </div>
                    ) : null}
                  </div>

                  {/* Email */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <label htmlFor="email">Email</label>
                    <input
                      name="email"
                      placeholder="JohnDoe@gmail.com"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`field-input pl-14`}
                    />
                    <img
                      src={emailIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-11"
                    />
                    {errors.email && touched.email ? (
                      <div className="absolute text-red-600 -bottom-6">
                        {errors.email}
                      </div>
                    ) : null}
                    {message[1] && !changed ? (
                      <div className="absolute text-red-600 -bottom-6">
                        {message[1]}
                      </div>
                    ) : null}
                  </div>

                  {/* Password */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <label htmlFor="">Password</label>
                    <input
                      name="password"
                      placeholder="***************"
                      onChange={(e) => {
                        setChanged(true);

                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visible ? "text" : "password"}
                      className={`field-input pl-14`}
                    />
                    <button
                      type="button"
                      className="h-6 w-6 absolute right-5 top-10 translate-y-[5%] text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <BsFillEyeFill className="h-full" />
                      ) : (
                        <BsFillEyeSlashFill className="h-full" />
                      )}
                    </button>
                    <img
                      src={passwordIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-11"
                    />
                    {errors.password && touched.password ? (
                      <div className="absolute text-red-600 -bottom-6">
                        {errors.password}
                      </div>
                    ) : null}
                    {true ? (
                      <div className="absolute text-red-600 -bottom-6"></div>
                    ) : null}
                  </div>

                  {/* T&C */}
                  <div className="w-full relative">
                    <input
                      name="passwordConfirm"
                      placeholder="confirm password"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="checkbox"
                      className={``}
                    />
                    <label htmlFor="" className="ml-3">
                      Saya setuju dengan{" "}
                      <span className="text-primary">persyaratan</span> dan{" "}
                      <span className="text-primary">persetujuan</span>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    buttonContent={isSubmitting ? "Loading.." : "Sign Up"}
                    disabled={!isValid || isSubmitting}
                    className="bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm leading-5 hover:bg-dark-primary"
                  />
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
