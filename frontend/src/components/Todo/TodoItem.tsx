import React, { useState } from "react";
import "./TodoItem.css";
import UpdateForm from "./UpdateForm";

type Props = {
  todo: ITodo;
  removeTodo: (id: number) => void;
  updateHandler: (res: Response) => void;
  changeStatus: (todo: ITodo) => void;
};

const TodoItem: React.FC<Props> = ({
  todo,
  removeTodo,
  updateHandler,
  changeStatus,
}) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div>
      {showInput ? (
        <UpdateForm
          content={todo.content}
          setShowInput={setShowInput}
          updateHandler={updateHandler}
          id={todo.id}
        />
      ) : (
        <div>
          <div>
            <input
              type="checkbox"
              onChange={() => changeStatus(todo)}
              checked={todo.completed}
            />
          </div>
          <div className={todo.completed ? "titleChecked" : "notChecked"}>
            {todo.content} {"   "}
          </div>
          <div>
            <button
              onClick={() => {
                removeTodo(todo.id);
              }}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Remove
            </button>{" "}
            <button
              onClick={() => setShowInput(!showInput)}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              {" "}
              Update{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
