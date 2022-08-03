import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import axios from "axios";
import API_URL from "../../Helpers/API_URL";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";
import Googleicon from "../../Assets/google-icon.png";
import signupImage from "../../Assets/signup-image.png";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const [visible, setVisible] = useState(false);

  const initialValues = {
    adminId: "",
    password: "",
  };

  const containSpaces = (string) => / /g.test(string);

  const validationSchema = Yup.object({
    adminId: Yup.string()
      .required("Username / email admin is Required!")
      .test(
        "Must not contain a space",
        "Must not contain a space",
        (value) => !containSpaces(value)
      ),
    password: Yup.string().required("Password is Required!"),
  });

  const onSubmit = async (values, onSubmit) => {
    try {
      console.log("<<<<<< Data Dikirim");
      let res = await axios.post(`${API_URL}/admin/adminlogin`, {
        username: values.adminId,
        email: values.adminId,
        password: values.password,
      });
      Cookies.set("token", res.headers["x-token-access"]);
      dispatch({ type: "LOGIN", payload: res.data });
      toast.success(`welcome back ${values.adminId}`, {
        theme: "colored",
        position: "top-center",
        style: { backgroundColor: "#3A7D44" },
      });
      setTimeout(() => {
        navigate("/admin/dashboard");
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
    <div className="w-screen h-screen justify-center flex bg-white">
      <div className="flex">
        <div className="w-1/2 h-full flex">
          <div className="bg-white m-auto h-full w-full">
            <img className="w-[700px] h-[750px]" alt="" src={signupImage} />
          </div>
        </div>
        <div className="w-1/2 h-full flex">
          <div className="bg-white m-auto h-[650px] w-[580px]">
            <div className="flex justify-end mb-12">
              <button className="border w-11 h-7 bg-gray-200 text-teal-600 rounded-sm">
                EN
              </button>
              <button className="border w-11 h-7 bg-teal-600 text-white rounded-sm">
                ID
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
                    <div className="w-full mb-9">
                      <div className="w-16 h-7 font-extrabold">Masuk</div>
                    </div>
                    <div className="mb-4">
                      <div className="w-9 h-5 mb-1">Email/Username</div>
                      <input
                        className={
                          errors.adminId &&
                          touched.adminId &&
                          values.adminId.length &&
                          dirty &&
                          !changed
                            ? "w-full h-10 border rounded-sm border-gray-300"
                            : "w-full h-10 border rounded-sm border-gray-300"
                        }
                        name="adminId"
                        type="text"
                        placeholder="Masukan Email / Username"
                        onChange={(e) => {
                          setChanged(true);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        value={values.adminId}
                      />

                      {errors.adminId &&
                      touched.adminId &&
                      dirty &&
                      values.adminId.length ? (
                        <div name="adminId" className="absolute text-red-600">
                          {errors.adminId}
                        </div>
                      ) : null}
                      {true ? (
                        <div className="absolute text-red-600"></div>
                      ) : null}
                    </div>

                    <div className="mb-3 relative">
                      <div className="w-9 h-5 mb-1">Password</div>
                      <input
                        className={
                          errors.adminId &&
                          touched.adminId &&
                          values.adminId.length &&
                          dirty &&
                          !changed
                            ? "w-full h-10 border rounded-sm border-gray-300"
                            : "w-full h-10 border rounded-sm border-gray-300"
                        }
                        type={visible ? "text" : "password"}
                        placeholder="Masukan Password"
                        name="password"
                        onChange={(e) => {
                          setChanged(true);
                          handleChange(e);
                        }}
                        autoFocus={false}
                        value={values.password}
                        onBlur={handleBlur}
                      />
                      <button
                        type="button"
                        className="h-6 w-6 absolute right-5 top-8 text-secondary rounded-full flex justify-center items-center hover:bg-neutral-gray"
                        onClick={() => setVisible(!visible)}
                      >
                        {visible ? (
                          <BsFillEyeFill className="h-full" />
                        ) : (
                          <BsFillEyeSlashFill className="h-full" />
                        )}
                      </button>
                      {true ? (
                        <div className="absolute text-red-600"></div>
                      ) : null}
                      {true ? (
                        <div className="absolute text-red-600"></div>
                      ) : null}
                    </div>

                    <div className="flex justify-between mb-9">
                      <div className="flex">
                        <input
                          type="checkbox"
                          className="flex items-center h-full w-4"
                        />
                        <div className="px-1 text-base">Ingat saya</div>
                      </div>
                      <button>Lupa Kata Sandi?</button>
                    </div>
                    <div className="w-full flex justify-center mb-12">
                      <button
                        className="w-full h-12 border bg-teal-600 text-white rounded-md hover:bg-teal-700"
                        type="submit"
                        disabled={!isValid || !changed || isSubmitting}
                      >
                        Masuk
                      </button>
                    </div>
                    <div className="flex justify-center w-full mb-11">
                      <div className="w-full text-center">
                        Atau Masuk Dengan
                      </div>
                    </div>
                    <div className="flex justify-center w-full mb-12">
                      <button className="w-full h-12 border border-teal-600 hover:bg-teal-600 hover:text-white text-center rounded-md font-bold">
                        <div className="flex justify-center">
                          <img src={Googleicon} className="w-8 h-8" />
                          <div className="pt-1 px-2">Masuk Dengan Google</div>
                        </div>
                      </button>
                    </div>
                    <div className="flex justify-center w-full">
                      <div>
                        Belum Punya Akun?
                        <button className="font-bold text-teal-600">
                          {" "}
                          Daftar{" "}
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
