import React, { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrClose } from "react-icons/gr";
import { BsBellFill } from "react-icons/bs";
import useTodoStore from "../../store/useStore";
import Loading from "../Loading";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";

const AddTodoBottomDrawer: React.FC<{
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
  const { createTodo, taskLoading } = useTodoStore();
  const [newTodo, setNewTodo] = useState<{
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

  const [error, setError] = useState<{
    title: string;
    date: string;
    start_time: string;
    stop_time: string;
  }>({
    title: "",
    date: "",
    start_time: "",
    stop_time: "",
  });

  const handleCreateTodoTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleCreateTodoDate = (date: any) => {
    console.log(date.$d);
    setNewTodo({
      ...newTodo,
      date,
    });
  };

  const handleCreateStartTime = (time: any) => {
    console.log(time.format("HH:mm")); // Get the selected time in HH:mm format
    setNewTodo({
      ...newTodo,
      start_time: time.format("HH:mm"),
    });
  };

  const handleCreateStopTime = (time: any) => {
    console.log(time.format("HH:mm")); // Get the selected time in HH:mm format
    setNewTodo({
      ...newTodo,
      stop_time: time.format("HH:mm"),
    });
  };

  const handleAddTodo = async () => {
    const newError: typeof error = { ...error };

    if (newTodo.title === "") {
      newError.title = "Title is required";
    } else {
      newError.title = "";
    }

    if (newTodo.date === "") {
      newError.date = "Date is required";
    } else {
      newError.date = "";
    }

    if (newTodo.start_time === "") {
      newError.start_time = "Start time is required";
    } else {
      newError.start_time = "";
    }

    if (newTodo.stop_time === "") {
      newError.stop_time = "Stop time is required";
    } else {
      newError.stop_time = "";
    }

    setError(newError);

    if (
      newTodo.title === "" ||
      newTodo.date === "" ||
      newTodo.start_time === "" ||
      newTodo.stop_time === ""
    ) {
      return;
    } else {
      // Check if "createTodo" task is currently loading
      if (taskLoading.createTodo) {
        return; // Do nothing if the task is still loading
      }

      try {
        // Set the "taskLoading.createTodo" flag to true to indicate loading
        useTodoStore.setState({
          taskLoading: { ...taskLoading, createTodo: true },
        });

        // Call the "createTodo" function
        await createTodo(newTodo);

        // Show success toast
        addToast(
          "Task Added successfully.",
          "success",
          "check-icon",
          "green",
          "bg-green-100"
        );
      } catch (error) {
        // Handle any errors here if necessary
        console.error("Error occurred during createTodo:", error);
      } finally {
        // Reset the "newTodo" state
        setNewTodo({
          title: "",
          date: "",
          start_time: "",
          stop_time: "",
          updatedAt: "",
        });

        // close modal
        handleHide(false);
        // Set the "taskLoading.createTodo" flag back to false
        useTodoStore.setState({
          taskLoading: { ...taskLoading, createTodo: false },
        });
      }
    }
  };

  return (
    <div>
      <div
        className={`fixed left-0 right-0 z-50 w-full h-[400px] p-4 overflow-y-auto transition-transform bg-white rounded-t-3xl ${
          hide
            ? "-translate-y-[400px] -bottom-[400px] transition delay-150 ease-in-out"
            : "-bottom-[400px]"
        }`}
      >
        <h5 className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
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
        <form className="flex flex-col">
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
              {error.title && (
                <p className="text-red-500 text-[0.7em]">{error.title}</p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <DatePicker handleDate={handleCreateTodoDate} />
                {error.date && (
                  <p className="text-red-500 text-[0.7em]">{error.date}</p>
                )}
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="start_time" className="sr-only">
                      Start Time
                    </label>
                    <TimePicker handleChange={handleCreateStartTime} />
                    {error.start_time && (
                      <p className="text-red-500 text-[0.7em]">
                        {error.start_time}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="stop_time" className="sr-only">
                      Stop Time
                    </label>
                    <TimePicker handleChange={handleCreateStopTime} />
                    {error.stop_time && (
                      <p className="text-red-500 text-[0.7em]">
                        {error.stop_time}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 justify-between mt-2">
              <p className="inline-flex items-center">
                <BsBellFill className="text-xs mr-1" />
                <span className="text-gray-500">10 Minute before</span>
              </p>
              <span className="inline-flex text-[0.6em]">
                <GrClose />
              </span>
            </div>
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
                {taskLoading.createTodo ? (
                  <span className="inline-flex items-center">
                    <Loading />
                    Adding...
                  </span>
                ) : (
                  "Add"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodoBottomDrawer;
