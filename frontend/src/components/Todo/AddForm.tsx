import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextInput from "../UI/TextInput";
import { FormikHelpers } from "formik";

type Props = {
  addHandler: (values: AddValues, helpers: FormikHelpers<AddValues>) => void;
};

const AddForm: React.FC<Props> = ({ addHandler }) => {
  const intial = { todo: "" };
  const Schema = Yup.object({
    todo: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
  });
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <div>
      <Formik
        initialValues={intial}
        validationSchema={Schema}
        onSubmit={addHandler}
      >
        <Form>
          <TextInput
            name="todo"
            type="text"
            placeholder="Enter Todo"
            inputStyle={inputStyle}
          />

          <button
            type="submit"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Add
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddForm;
