import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MessageObj from "../services/message.service";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextInput from "./UI/TextInput";
import { FirebaseError } from '@firebase/util';

function LoginForm() {
  const { login }  = useAuth();
  const navigate = useNavigate();
  const initial = { email: "", password: "" };
  const Schema = Yup.object({
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  async function handleFormSubmit(values: LoginValues) {
    try {
      await login(values.email, values.password);
      navigate("/todo");
    } catch (e) {

      if(e instanceof FirebaseError) {
        if (e.code === "auth/wrong-password" ) {
          MessageObj.errorMessage("Username or Password is incorrect");
        } else if (e.code === "auth/user-not-found") {
          MessageObj.errorMessage("User not found");
        }
      }

    }
  }

  console.log(process.env)

  return (
    <div>
      <Formik
        initialValues={initial}
        validationSchema={Schema}
        onSubmit={handleFormSubmit}
      >
        <Form>
          <TextInput
            label="Email Address"
            name="email"
            type="email"
            placeholder="Enter Email"
            inputStyle={inputStyle}
          />

          <TextInput
            label="Password"
            name="password"
            type="password"
            placeholder="Enter Password"
            inputStyle={inputStyle}
          />

          <button type="submit">Login</button>
        </Form>
      </Formik>
      <Link
        to="/register"
        className="text-blue-600 hover:underline dark:text-blue-500"
      >
        Don't have an account? Register
      </Link>
      <ToastContainer />
    </div>
  );
}

export default LoginForm;
