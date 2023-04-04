import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import MessageObj from "../services/message.service";
import { useEffect } from "react";
import { FirebaseError } from "@firebase/util";
import TextInput from "./UI/TextInput";

function RegisterForm() {
  const { currentUser, register } = useAuth();
  const navigate = useNavigate();
  const initial = { email: "", password: "" };
  const Schema = Yup.object({
    password: Yup.string()
      .min(6, "Must be 6 characters or more")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    confirmPassword: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  useEffect(() => {
    if (currentUser) {
      navigate("/todo");
    }
  }, [currentUser, navigate]);

  async function handleFormSubmit(values: LoginValues) {
    try {
      await register(values.email, values.password);
      navigate("/todo");
    } catch (e) {
      if (e instanceof FirebaseError) {
        MessageObj.errorMessage(e.code);
      }
    }
  }

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

          <TextInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            inputStyle={inputStyle}
          />

          <button type="submit">Register</button>
        </Form>
      </Formik>
      <Link
        to="/login"
        className="text-blue-600 hover:underline dark:text-blue-500"
      >
        Already have an account? Login
      </Link>
    </div>
  );
}

export default RegisterForm;
