import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddForm from "./AddForm";
import TodoService from "../../services/todo.service";
import MessageObj from "../../services/message.service";
import Swal from "sweetalert2";
import { FormikHelpers } from "formik";

export default function Profile() {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      TodoService.get()
        .then((res) => {
          setTodos(res);
        })
        .catch((err) => {
          console.log(err);
        });
      setLoading(false);
    };

    fetchData();
  }, []);

  const addHandler = (
    values: AddValues,
    { resetForm }: FormikHelpers<AddValues>
  ) => {
    TodoService.add(values.todo)
      .then((res) => {
        setTodos((preState) => [res.data, ...preState]);
        MessageObj.successMessage("To do Created!");
      })
      .catch((err) => {
        MessageObj.errorMessage("To do Could not be added!");
      });
    resetForm();
  };

  const updateHandler = (res: Response) => {
    setTodos((preState) => {
      return preState.map((todo) => {
        if (res.data.id === todo.id) {
          return res.data;
        }
        return todo;
      });
    });
  };

  const removeTodo = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        TodoService.remove(id)
          .then((res) => {
            setTodos((preState) => {
              return preState.filter((todo) => {
                return todo.id !== res.data.id;
              });
            });
            MessageObj.successMessage("To do Deleted!");
          })
          .catch(() => {
            MessageObj.errorMessage("To do Could not be added!");
          });
      }
    });
  };

  const changeStatus = (todo: ITodo) => {
    TodoService.changeStatus(todo.id, todo.completed)
      .then((res) => {
        setTodos((preState) => {
          return preState.map((todo) => {
            if (res.data.id === todo.id) {
              return res.data;
            }
            return todo;
          });
        });
        MessageObj.successMessage("Status updated");
      })
      .catch((err) => {
        MessageObj.errorMessage("Status could not be updated");
      });
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-4 text-3xl text-center tracking-tight font-light dark:text-white">
            To Do's
          </h2>
        </div>

        <AddForm addHandler={addHandler} />

        <div>
          {loading ? (
            <div>Loading</div>
          ) : (
            <div>
              {todos.map((todo, index) => {
                return (
                  <TodoItem
                    key={index}
                    todo={todo}
                    removeTodo={removeTodo}
                    updateHandler={updateHandler}
                    changeStatus={changeStatus}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
