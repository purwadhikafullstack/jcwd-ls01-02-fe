import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import Cookies from "js-cookie";
import Button from "../Component/Button";
import emailIcon from "../../Assets/email-icon.png";
import passwordIcon from "../../Assets/password-icon.png";
import signupImage from "../../Assets/signup-image.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import ForgotPasswordModal from "../Component/ForgotPasswordModal";
import googleIcon from "../../Assets/google-icon.png";
import FormikControl from "../Component/Formik/FormikControl";
import logo from "../../Assets/logo.png";

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
      dispatch({ type: "LOGIN", payload: res.data.data });
      toast.success(`welcome back ${values.personId}`, {
        theme: "colored",
        style: { backgroundColor: "#009B90" },
      });
      setTimeout(() => {
        navigate("/");
      });
    } catch (error) {
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
      toast.error(error.response.data.message, {
        theme: "colored",
        style: { backgroundColor: "#EB1D36" },
      });
    } finally {
      onSubmit.setSubmitting(false);
    }
  };

  useEffect(() => {
    return () => {
      message = [];
      dispatch({ type: "CLEARERROR" });
    };
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
        <div className="w-1/2 h-full border flex justify-center items-center relative">
          <i
            className="btn-plain w-1/6 min-h-min z-10 cursor-pointer absolute left-10 top-10"
            onClick={() => navigate("/")}
          >
            <img src={logo} alt="" />
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
                      <FormikControl
                        control="INPUT"
                        label="Email/Username"
                        name="personId"
                        placeholder="JohnDoe@gmail.com"
                        onChange={(e) => {
                          setChanged(true);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type="text"
                        className={` pl-14 ${
                          (errors.personId && touched.personId) ||
                          (message[0] && !changed)
                            ? "outline-red-700"
                            : null
                        }`}
                      />
                      <img
                        src={emailIcon}
                        alt=""
                        className="h-5 w-5 absolute left-5 top-11"
                      />
                    </div>

                    {/* Password */}
                    <div className="w-full relative flex flex-col justify-between gap-y-2">
                      <FormikControl
                        control="INPUT"
                        label="Password"
                        name="password"
                        placeholder="***************"
                        onChange={(e) => {
                          setChanged(true);

                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        type={visible ? "text" : "password"}
                        className={`pl-14 placeholder:translate-y-1 ${
                          errors.password && touched.password
                            ? "outline-red-700"
                            : null
                        } `}
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
                    </div>

                    {/* T&C */}
                    <div className="w-full flex items-center mt-3">
                      <Field
                        name="termsCondition"
                        type="checkbox"
                        className={`checkbox checkbox-primary ${
                          errors.termsCondition && touched.termsCondition
                            ? "border-red-600"
                            : ""
                        }`}
                      />

                      <span className="text-secondary ml-3">Ingat saya</span>

                      <span
                        className="text-primary cursor-pointer ml-auto"
                        onClick={() => forgotPasswordModalHandler(true)}
                      >
                        Lupa Kata Sandi?
                      </span>
                    </div>
                    <Button
                      type="submit"
                      buttonContent={isSubmitting ? "Loading.." : "Log In"}
                      disabled={!isValid || isSubmitting}
                      className={`button-primary w-full disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed text-sm leading-5  ${
                        isSubmitting && "button-loading"
                      }`}
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
                      type="button"
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
                      className="button-general w-full outline outline-1 outline-neutral-gray relative gap-x-3 hover:bg-neutral-gray/50"
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
