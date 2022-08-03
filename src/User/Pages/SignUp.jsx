import { Form, Formik, Field } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Component/Button";
import profileIcon from "../../Assets/profile-icon.png";
import emailIcon from "../../Assets/email-icon.png";
import passwordIcon from "../../Assets/password-icon.png";
import signupImage from "../../Assets/signup-image.png";
import logo from "../../Assets/logo.png";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import facebookIcon from "../../Assets/facebook-icon.png";
import googleIcon from "../../Assets/google-icon.png";
import FormikControl from "../Component/Formik/FormikControl";
import { registerAction } from "../../Redux/Reducers/Actions/UserActions";
import { ChevronLeftIcon } from "@heroicons/react/outline";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error_mes, isLogin } = useSelector((state) => state.user);

  const [visible, setVisible] = useState(false);
  const [visibleConf, setVisibleConf] = useState(false);
  const [changed, setChanged] = useState(false);
  const [message, setMessage] = useState([]);

  const initialValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    termsCondition: false,
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
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?^()\-_+=])/,
        "Harus menganduk huruf besar, angka, dan karakter spesial (e.g. !@#$)"
      )
      .required("Password wajib diisi"),
    passwordConfirmation: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Cocokkan dengan password kamu sebelumnya"
      )
      .required("Cocokkan dengan password kamu sebelumnya"),
    termsCondition: Yup.boolean().oneOf(
      [true],
      "Kamu belum menyetujui persyaratan dan persetujuan"
    ),
  });

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setMessage([]);
      setChanged(false);
      dispatch({ type: "LOADING" });
      await dispatch(registerAction(values));
      navigate("/unverified");
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "DONE" });
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (error_mes) {
      setMessage(error_mes.split(","));
    }
    if (isLogin) return navigate("/");
    return () => {
      dispatch({ type: "CLEARERROR" });
    };
    // eslint-disable-next-line
  }, [error_mes]);

  return (
    <div className="w-screen min-h-screen flex bg-white">
      <div className="w-1/2 min-h-screen hidden sm:flex justify-center items-center relative">
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
      <div className="w-full sm:w-1/2 min-h-screen border flex shadow-2xl">
        <div className="bg-white h-fit sm:h-5/6 w-5/6 m-auto flex flex-col sm:items-center sm:justify-center gap-y-2 sm:gap-y-5 py-5 sm:py-10 container">
          <div className="w-full min-h-min text-xl sm:text-2xl flex gap-x-2 font-bold items-center">
            <button
              className="btn-plain h-10 aspect-square flex sm:hidden"
              onClick={() => navigate("/")}
            >
              <ChevronLeftIcon className="h-full scale-75" />
            </button>
            Registrasi Akun
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
              <div className="w-full h-11 hidden sm:flex items-center gap-x-4">
                <Button
                  type="button"
                  className="button-general w-full outline outline-1 outline-neutral-gray relative gap-x-3 hover:bg-neutral-gray/50"
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
                  className="button-general w-full bg-facebook text-white relative gap-x-3"
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
              <div className="w-full h-11 flex sm:hidden items-center gap-x-4">
                <Button
                  type="button"
                  className="button-general w-full py-3 outline outline-1 font-bold outline-neutral-gray relative gap-x-3 hover:bg-neutral-gray/50"
                  buttonContent={
                    <>
                      <img
                        src={googleIcon}
                        alt=""
                        className="h-5 aspect-square"
                      />{" "}
                      Google
                    </>
                  }
                />
                <Button
                  type="button"
                  className="button-general w-full py-3 bg-facebook font-bold text-white relative gap-x-3"
                  buttonContent={
                    <>
                      <img
                        src={facebookIcon}
                        alt=""
                        className="h-5 aspect-square"
                      />{" "}
                      Facebook
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
                isSubmitting,
                handleBlur,
                errors,
                touched,
              } = formik;

              return (
                <Form className="flex flex-col min-h-min w-full justify-center items-center gap-y-5">
                  {/* Username */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      autoFocus={true}
                      control="INPUT"
                      label="Username"
                      name="username"
                      placeholder="JohnDoe"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`pl-14 ${
                        (errors.username && touched.username) ||
                        (message[0] && !changed)
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                    <img
                      src={profileIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-10 sm:top-11"
                    />
                    {message[0] && !changed && (
                      <div className="absolute text-red-600 -bottom-6 right-0 text-sm">
                        {message[0]}
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Email"
                      name="email"
                      placeholder="JohnDoe@gmail.com"
                      onChange={(e) => {
                        setChanged(true);
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type="text"
                      className={`pl-14 ${
                        (errors.email && touched.email) ||
                        (message[1] && !changed)
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                    <img
                      src={emailIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-10 sm:top-11"
                    />
                    {message[1] && !changed && (
                      <div className="absolute text-red-600 -bottom-6 right-0 text-sm">
                        {message[1]}
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Password"
                      name="password"
                      placeholder="********"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visible ? "text" : "password"}
                      className={`pl-14 placeholder:translate-y-1 ${
                        errors.password && touched.password
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                    <button
                      type="button"
                      className="button-general outline-0 h-7 aspect-square absolute right-2 sm:right-5 top-9 sm:top-10 text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() => setVisible(!visible)}
                    >
                      {visible ? (
                        <BsEyeFill className="w-full" />
                      ) : (
                        <BsEyeSlashFill className="w-full" />
                      )}
                    </button>
                    <img
                      src={passwordIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-10 sm:top-11"
                    />
                  </div>
                  {/* Confirmation Password */}
                  <div className="w-full relative flex flex-col justify-between gap-y-2">
                    <FormikControl
                      control="INPUT"
                      label="Password Confirmation"
                      name="passwordConfirmation"
                      placeholder="********"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={handleBlur}
                      type={visibleConf ? "text" : "password"}
                      className={`pl-14 placeholder:translate-y-1 ${
                        errors.passwordConfirmation &&
                        touched.passwordConfirmation
                          ? "outline-red-700"
                          : null
                      }`}
                    />
                    <button
                      type="button"
                      className="button-general outline-0 h-7 aspect-square absolute right-2 sm:right-5 top-9 sm:top-10  text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                      onClick={() => setVisibleConf(!visibleConf)}
                    >
                      {visibleConf ? (
                        <BsEyeFill className="w-full" />
                      ) : (
                        <BsEyeSlashFill className="w-full" />
                      )}
                    </button>
                    <img
                      src={passwordIcon}
                      alt=""
                      className="h-5 w-5 absolute left-5 top-10 sm:top-11"
                    />
                  </div>

                  {/* T&C */}
                  <div className="w-full relative flex items-center">
                    <Field
                      name="termsCondition"
                      type="checkbox"
                      className={`checkbox checkbox-primary ${
                        errors.termsCondition && touched.termsCondition
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    <label htmlFor="" className="ml-3 text-xs sm:text-base">
                      Saya setuju dengan{" "}
                      <label
                        htmlFor="termsAndCondition"
                        className="span-general text-primary text-xs sm:text-base bg-white cursor-pointer hover:underline"
                      >
                        persyaratan
                      </label>{" "}
                      dan{" "}
                      <label
                        htmlFor="termsAndCondition"
                        className="span-general text-primary text-xs sm:text-base bg-white cursor-pointer hover:underline"
                      >
                        persetujuan
                      </label>
                      <input
                        type="checkbox"
                        id="termsAndCondition"
                        className="modal-toggle"
                      />
                      <label
                        htmlFor="termsAndCondition"
                        className="modal cursor-pointer"
                      >
                        <label
                          className="modal-box relative h-1/2 w-full"
                          htmlFor=""
                        >
                          <div className="h-full w-full flex flex-col justify-center items-center gap-y-5">
                            <h1 className="w-full text-center">
                              Persyaratan dan Persetujuan
                            </h1>
                            <div className="w-full h-4/5 overflow-y-scroll">
                              <p className="text-sm text-justify">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Veritatis ducimus facere
                                corporis accusantium dignissimos distinctio?
                                Libero, architecto dolore sint laudantium
                                repellat molestiae veniam repudiandae earum
                                rerum dolor unde, assumenda ducimus? Lorem
                                ipsum, dolor sit amet consectetur adipisicing
                                elit. Minus, maiores nostrum asperiores,
                                dignissimos quaerat illo, quibusdam obcaecati ab
                                dolorem ex distinctio sit reprehenderit
                                excepturi assumenda quo nesciunt voluptatem.
                                Tempora, perferendis animi! A praesentium
                                eligendi beatae saepe aut rerum, similique minus
                                expedita, enim odit, autem quo nesciunt corporis
                                velit quisquam. Ratione sint facilis assumenda
                                dignissimos cum id recusandae, magni asperiores
                                accusantium commodi dolor, minus explicabo amet
                                libero, fugiat corporis officia itaque incidunt
                                voluptas accusamus et! Similique suscipit amet
                                dolore officiis odit quas unde quos, praesentium
                                facilis laborum possimus voluptatum ipsum ipsam
                                eos aperiam distinctio ullam voluptatibus
                                tempora magnam recusandae numquam et laboriosam
                                tenetur? Cumque facere placeat illo aliquid
                                maxime aut incidunt ducimus amet labore, nobis
                                pariatur ex assumenda quos sit fugit molestias
                                nesciunt, maiores error! Cum ipsam neque eos?
                                Fugit error aut eveniet voluptatem ab molestiae
                                libero non, eum accusantium dolore minus
                                assumenda? Suscipit, non aspernatur nostrum
                                asperiores unde enim. Ea eaque sequi laboriosam
                                asperiores distinctio ducimus dignissimos
                                provident obcaecati, repellendus tempore minima
                                possimus. Possimus non nostrum enim quibusdam,
                                ipsum beatae dolorem neque perferendis debitis
                                error optio fuga aut voluptatem ea fugit odit
                                vel harum similique tenetur maiores dolores rem
                                animi, atque voluptatibus. Vel repudiandae
                                expedita corporis inventore quas sed atque.
                              </p>
                            </div>
                            <div>
                              <label
                                htmlFor="termsAndCondition"
                                className="button-primary w-full px-5 cursor-pointer"
                              >
                                Saya mengerti
                              </label>
                            </div>
                          </div>
                        </label>
                      </label>
                    </label>
                    {errors.termsCondition && touched.termsCondition && (
                      <div className="absolute text-red-600 -bottom-4 text-[10px] sm:text-sm ml-9">
                        {errors.termsCondition}
                      </div>
                    )}
                  </div>
                  <Button
                    type="submit"
                    buttonContent={
                      isSubmitting ? "Mendaftarkan akun..." : "Daftar"
                    }
                    disabled={
                      isSubmitting || (!changed && (message[0] || message[1]))
                    }
                    className={`button-primary w-full disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed text-sm leading-5  ${
                      isSubmitting && "button-loading"
                    }`}
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
