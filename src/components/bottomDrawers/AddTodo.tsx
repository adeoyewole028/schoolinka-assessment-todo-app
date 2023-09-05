import { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrClose } from "react-icons/gr";
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
  const addTodo = useTodoStore((state) => state.createTodo);
  const [createTodo, setCreateTodo] = useState<{
    title: string;
    date: string;
    start_time: string;
    stop_time: string;
    updatedAt: string;
  }>({
    title: "",
    date: "",
    start_time: "",
    stop_time: "",
    updatedAt: "",
  });

  const handleCreateTodoTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCreateTodo({
      ...createTodo,
      [name]: value,
    });
  };

  const handleCreateTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCreateTodo({
      ...createTodo,
      [name]: value,
    });
  };

  const handleAddTodo = () => {
    if (
      createTodo.title === "" ||
      createTodo.date === "" ||
      createTodo.start_time === "" ||
      createTodo.stop_time === ""
    ) {
      addToast(
        "Please fill all the fields.",
        "error",
        "cross-icon",
        "red",
        "bg-red-100"
      );
      return;
    } else {
      addTodo({
        title: createTodo.title,
        date: createTodo.date,
        start_time: createTodo.start_time,
        stop_time: createTodo.stop_time,
        updatedAt: createTodo.updatedAt
      });
      addToast(
        "Task Added successfully.",
        "success",
        "check-icon",
        "green",
        "bg-green-100"
      );
      handleHide(false);
      setCreateTodo({
        title: "",
        date: "",
        start_time: "",
        stop_time: "",
        updatedAt: "",
      });
    }
  };

  return (
    <div>
      <div
        className={`fixed left-0 right-0 z-50 w-full h-96 p-4 overflow-y-auto transition-transform bg-white rounded-t-3xl ${
          hide
            ? "-translate-y-96 -bottom-96 transition delay-150 ease-in-out"
            : "-bottom-96"
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
          Add Task
        </h5>
        <button
          onClick={() => handleHide(false)}
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

        {/* // Create todo */}
        <form className="flex flex-col ">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <textarea
                className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-3 focus:border-sky-500 bg-gray-50"
                name="title"
                id="title"
                cols={30}
                rows={5}
                onChange={handleCreateTodoTextarea}
                placeholder="Add task for today"
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
                  onChange={handleCreateTodoInput}
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
                      onChange={handleCreateTodoInput}
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
                      onChange={handleCreateTodoInput}
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
                onClick={() => handleHide(false)}
                className="border rounded-md bg-white font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTodo}
                className="bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BottomDrawer;
