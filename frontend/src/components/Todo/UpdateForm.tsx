import React from "react";
import TodoService from "../../services/todo.service";
import MessageObj from "../../services/message.service";
import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import TextInput from "../UI/TextInput";

type Props =  {
  content: string
  setShowInput: (bool:boolean) => void
  id: number
  updateHandler: (res: Response) => void
}

const UpdateForm: React.FC<Props> = ({ content, setShowInput, id, updateHandler }) => {
  const initial: AddValues = { todo: content };
  const Schema = Yup.object({
    todo: Yup.string()
      .min(3, "Must be 3 characters or more")
      .required("Required"),
  });
  const inputStyle =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  const handleSubmit = (values: AddValues, { resetForm }: FormikHelpers<AddValues>) => {
    if (values.todo.length === 0) {
      Swal.fire(
        "Empty Todo",
        "Todo cannot be empty, please add something.",
        "error"
      );
    } else {
      TodoService.update(id, values.todo)
        .then((res) => {
          updateHandler(res);
          MessageObj.successMessage("To do Updated!");
          setShowInput(false);
        })
        .catch(() => {
          MessageObj.errorMessage("To do Could not be added!");
        });
      resetForm();
    }
  };

  return (
    <div>
      <Formik
        initialValues={initial}
        validationSchema={Schema}
        onSubmit={handleSubmit}
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
            Update
          </button>
          <button
            onClick={() => {
              setShowInput(false);
            }}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Cancel
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default UpdateForm;
