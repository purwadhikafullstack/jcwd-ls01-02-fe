import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../Helpers/API_URL";
import Cookies from "js-cookie";
import Button from "../Component/Button";
import emailIcon from "../Assets/email-icon.png";
import passwordIcon from "../Assets/password-icon.png";
import signupImage from "../Assets/signup-image.png";
import logoImage from "../Assets/logo-1.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import ForgotPasswordModal from "../Component/ForgotPasswordModal";

function LogIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const { error_mes } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  const [forgotPasswordModal, forgotPasswordModalHandler] = useState(false);

  let message = [];
  if (error_mes) {
    message = error_mes.split(",");
  }

  const initialValues = {
    personId: "",
    password: "",
  };

  const containSpaces = (string) => / /g.test(string);
  const validationSchema = Yup.object({
    personId: Yup.string()
      .required("Username/Email is required!")
      .test(
        "Must not contain a space",
        "Must not contain a space",
        (value) => !containSpaces(value)
      ),
    password: Yup.string().required("Password is required!"),
  });

  const onSubmit = async (values, onSubmit) => {
    try {
      let res = await axios.post(`${API_URL}/auth/login`, {
        username: values.personId,
        email: values.personId,
        password: values.password,
      });
      Cookies.set("token", res.headers["x-token-access"]);
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success(`welcome back ${values.personId}`, {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#3A7D44" },
      });
      setTimeout(() => {
        navigate("/home");
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
    <>
      {forgotPasswordModal && (
        <ForgotPasswordModal
          forgotPasswordModal={forgotPasswordModal}
          forgotPasswordModalHandler={forgotPasswordModalHandler}
        />
      )}
      <div className="w-screen h-screen flex bg-white">
        <div className="w-1/2 h-full border flex justify-center items-center relative">
          <i
            className="w-1/6 min-h-min cursor-pointer absolute left-10 top-10"
            onClick={() => navigate("/home")}
          >
            <img src={logoImage} alt="" className="outline-none" />
          </i>
          <img
            src={signupImage}
            alt=""
            className="h-full object-cover absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        <div className="w-1/2 h-full border flex shadow-2xl">
          <div className="bg-white h-5/6 w-5/6 m-auto flex flex-col items-center justify-center gap-y-5 py-10 container">
            <div className="w-full min-h-min text-2xl font-bold">Masuk</div>
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
                  handleBlur,
                } = formik;

                return (
                  <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                    {/* Email */}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <label htmlFor="personId">Email / Username</label>
                      <input
                        name="personId"
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
                      {errors.personId && touched.personId ? (
                        <div className="absolute text-red-600 -bottom-6">
                          {errors.personId}
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
                        name="rememberme"
                        placeholder="rememberme"
                        onChange={(e) => {
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type="checkbox"
                      />
                      <label htmlFor="" className="ml-3">
                        <span className="text-secondary">Ingat saya</span>
                      </label>
                      <label htmlFor="" className="ml-3 absolute">
                        <span
                          className="text-neutral-gray cursor-pointer"
                          onClick={() => forgotPasswordModalHandler(true)}
                        >
                          Lupa Kata Sandi?
                        </span>
                      </label>
                    </div>
                    <Button
                      type="submit"
                      buttonText={isSubmitting ? "Loading.." : "Log In"}
                      disabled={!isValid || isSubmitting}
                      className="bg-primary text-white disabled:bg-gray-600 disabled:cursor-not-allowed text-sm leading-5"
                    />
                    <div className="w-full min-h-min flex flex-col gap-y-5">
                      <div className="w-full h-full relative flex justify-center items-center">
                        <div className="outline outline-1 outline-neutral-gray w-full absolute" />
                        <div className="px-5 leading-none z-10 min-h-min bg-white">
                          atau
                        </div>
                      </div>
                    </div>
                    <Button
                      type="Button"
                      buttonText="Masuk dengan Google"
                      className="outline-neutral-gray"
                    />
                    <div className="flex justify-center w-full -mt-2">
                      <div>
                        Belum Punya Akun?{" "}
                        <span className="font-bold text-teal-600">
                          <Link to="/register">Daftar</Link>
                        </span>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
