import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import { GrClose } from "react-icons/gr";
import { LuCalendar } from "react-icons/lu";
import { BiTimeFive } from "react-icons/bi";
import useTodoStore from "../../store/useStore";

const BottomDrawer: React.FC<{
  handleHide: (state: boolean) => void;
  hide: boolean;
  addToast: (
    message: string,
    type: string,
    icon: string,
    fill: string,
    background: string
  ) => void;
}> = ({ handleHide, hide, addToast }) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const singleTodo = useTodoStore((state) => state.singleTodo);
  const editTodo = useTodoStore((state) => state.singleTodo);
  //   const [edit, setEdit] = useState<{
  //     id: string;
  //     completed: boolean;
  //     title: string;
  //     date: string;
  //     start_time: string;
  //     stop_time: string;
  //   }>({
  //     title: editTodo.title,
  //     date: "",
  //     start_time: "",
  //     stop_time: "",
  //     id: editTodo.id,
  //     completed: false,
  //   });
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const [isEditTodo, setIsEditTodo] = useState<boolean>(false);
  const [editOrDelete, setEditOrDelete] = useState<boolean>(true);

  const handleEditOrDelete = () => {
    setIsEditTodo(false);
    setEditOrDelete(true);
  };

  const openEditTodo = (state: boolean) => {
    setIsEditTodo(state);
    setEditOrDelete(false);
  };

  const handleDeleteTodo = () => {
    console.log(singleTodo.id);
    deleteTodo(singleTodo.id);
    addToast(
      "Task has been deleted.",
      "success",
      "check-icon",
      "red",
      "bg-red-100"
    );
    handleHide(false);
  };

  const handleEditTodoTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    editTodo.title = value;
  };

  const handleEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    (editTodo as any)[name] = value;
  };

  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
    };
  }, [toastTimeout]);

  const handleUpdateTodo = () => {
    updateTodo(editTodo);

    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }

    const newTimeout = setTimeout(() => {
      addToast(
        "Task Updated successfully.",
        "success",
        "check-icon",
        "green",
        "bg-green-100"
      );
    }, 2000);

    handleHide(false);
    setToastTimeout(newTimeout);
  };

  return (
    <div>
      <div
        className={`sm:hidden fixed left-0 right-0 z-50 w-full h-[37rem] p-4 overflow-y-auto transition-transform bg-white rounded-t-3xl ${
          hide
            ? "-translate-y-[37rem] -bottom-[37rem] transition delay-150 ease-in-out"
            : "-bottom-[37rem]"
        }`}
      >
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
          <svg
            className="w-4 h-4 mr-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          Edit Task
        </h5>
        <button
          onClick={() => {
            handleHide(false);
            handleEditOrDelete();
          }}
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {/* Delete of Edit */}
        {editOrDelete && (
          <div className="flex flex-col ">
            <h3 className="mb-5 font-semibold capitalize">
              {singleTodo?.title}
            </h3>
            <div className="flex flex-col gap-2">
              <p className="flex items-center gap-1">
                <span className="inline-flex text-[#3F5BF6]">
                  <LuCalendar />
                </span>
                20th January, 2023
              </p>
              <p className="flex items-center gap-1">
                <span className="inline-flex text-[#3F5BF6]">
                  <BiTimeFive />
                </span>
                8:00 - 10:00 AM
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  onClick={handleDeleteTodo}
                  className="border rounded-md bg-white font-medium"
                >
                  Delete
                </Button>
                <Button
                  disabled={singleTodo?.completed}
                  onClick={() => openEditTodo(true)}
                  className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium ${
                    singleTodo?.completed ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* // Edit todo */}
        {isEditTodo && (
          <form className="flex flex-col ">
            <div className="flex flex-col gap-2">
              <div className="w-full">
                <textarea
                  className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-3 focus:border-sky-500 bg-gray-50"
                  name="title"
                  id="title"
                  cols={30}
                  rows={5}
                  defaultValue={editTodo.title}
                  onChange={handleEditTodoTextArea}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="">
                  <label htmlFor="date" className="sr-only">
                    Date
                  </label>
                  <input
                    className="border ring-1 ring-gray-300 w-full lg:w-[7em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 text-sm"
                    type="date"
                    name="date"
                    id="date"
                    onChange={handleEditTodoInput}
                  />
                </div>
                <div className="">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="time" className="sr-only">
                        Time
                      </label>
                      <input
                        className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 text-sm"
                        type="time"
                        name="start_time"
                        id="time"
                        onChange={handleEditTodoInput}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="sr-only">
                        Time
                      </label>
                      <input
                        className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 text-sm"
                        type="time"
                        name="stop_time"
                        id="time"
                        onChange={handleEditTodoInput}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <p className="flex items-center gap-1 justify-between mt-2">
                <span className="text-gray-500">10 Minute before</span>
                <span className="inline-flex text-[0.6em]">
                  <GrClose />
                </span>
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  onClick={() => {
                    handleHide(false);
                    handleEditOrDelete();
                  }}
                  className="border rounded-md bg-white font-medium"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleUpdateTodo();
                    handleEditOrDelete();
                  }}
                  className="bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium"
                >
                  Save
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default BottomDrawer;
