import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import React from "react";
import axios from "axios";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import API_URL from "../Helpers/API_URL";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";

const ForgotPasswordModal = (props) => {
  const dispatch = useDispatch();
  const { error_mes } = useSelector((state) => state.user);
  const [changed, setChanged] = useState(false);
  const [succeed, setSucceed] = useState(false);
  const { forgotPasswordModal, forgotPasswordModalHandler } = props;

  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address.")
      .required("Email is required!"),
  });

  const onSubmit = async (values) => {
    try {
      dispatch({ type: "LOADING" });
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: values.email,
      });
      setSucceed(true);
      toast.success("Email sent!", {
        position: "top-center",
        theme: "colored",
        style: { backgroundColor: "#3A7D44" },
      });
      setTimeout(() => {
        setSucceed(false);
        forgotPasswordModalHandler();
      }, 3000);
    } catch (error) {
      console.log(error);
      dispatch({
        type: "ERROR",
        payload: error.response.data.message || "Network Error",
      });
    } finally {
    }
  };

  return (
    <>
      <Transition appear show={forgotPasswordModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/60"
          onClose={forgotPasswordModalHandler}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            ></span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-neutral-gray shadow-2xl rounded-2xl">
                <Dialog.Title
                  as="div"
                  className="relative text-lg font-medium leading-6 text-putih bg-primary rounded text-center mb-5 -mt-7 -mx-10"
                >
                  <h1 className="h-20 w-100 flex justify-center items-center text-xl">
                    {!succeed && "Forgot Password?"}
                    {succeed && "Email sent!"}
                  </h1>
                  <XIcon
                    className="h-5 w-5 absolute top-1/2 right-8 -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:text-white text-white/50 duration-500 border-2 border-white/30 rounded-full hover:bg-white/30 hover:border-transparent"
                    onClick={() => forgotPasswordModalHandler()}
                  />
                </Dialog.Title>
                {!succeed && <div className="flex justify-center"></div>}
                {!succeed && (
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
                          isSubmitting,
                          isValid,
                          values,
                          dirty,
                          handleBlur,
                        } = formik;

                        return (
                          <Form className="flex flex-col gap-y-1">
                            <div className="flex flex-col relative">
                              <div className="flex justify-center">
                                Please input the registered email
                              </div>
                              <label htmlFor="email">Email</label>
                              <input
                                name="email"
                                placeholder="Email*"
                                type="text"
                                onChange={(e) => {
                                  setChanged(true);
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                value={values.email}
                                className={
                                  (errors.email &&
                                    values.email.length &&
                                    dirty) ||
                                  (error_mes && !changed)
                                    ? "p-2 px-4 outline outline-merah outline-2 rounded bg-putih"
                                    : "p-2 px-4 focus:outline focus:outline-biru focus:outline-2 rounded bg-putih"
                                }
                              />
                              {errors.email && dirty && values.email.length ? (
                                <div
                                  name="email"
                                  className="text-merah -ml-2 text-xs absolute px-2 -bottom-5 pointer-events-none"
                                >
                                  {errors.email}
                                </div>
                              ) : null}
                              {error_mes && !changed && (
                                <div className="text-merah -ml-2 text-xs absolute px-2 -bottom-5 pointer-events-none">
                                  {error_mes}
                                </div>
                              )}
                            </div>
                            <div className="mt-6 flex flex-col items-center">
                              <button
                                disabled={!dirty || !isValid || isSubmitting}
                                type="submit"
                                className="justify-center px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                                duration-500
                                      hover:text-putih shadow-md hover:shadow-black text-putih bg-primary border-transparent 
                                      disabled:bg-primary disabled:cursor-not-allowed"
                                onClick={() => setChanged(false)}
                              >
                                Reset Password
                              </button>
                            </div>
                          </Form>
                        );
                      }}
                    </Formik>
                  </>
                )}
                {succeed && (
                  <div className="text-center">
                    A reset password email has been sent to your email, please
                    check your email to reset your password.
                  </div>
                )}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ForgotPasswordModal;
