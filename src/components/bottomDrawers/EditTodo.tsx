import { useState } from "react";
import { Button } from "@nextui-org/react";
import { GrClose } from "react-icons/gr";
import { LuCalendar } from "react-icons/lu";
import { BiTimeFive } from "react-icons/bi";
import useTodoStore from "../../store/useStore";
import Loading from "../Loading";
import {
  formatTimeRange,
  formatDateRelativeToToday,
} from "../../lib/utils/timeFormatter";
import DatePicker from "../DatePicker";
import TimePickerValue from "../TimePicker";

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
  const editTodo = useTodoStore((state) => state.singleTodo);

  const { deleteTodo, taskLoading, singleTodo, updateTodo } = useTodoStore();
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

  const handleDeleteTodo = async () => {
    if (taskLoading.deleteTodo) {
      return;
    }
    try {
      useTodoStore.setState({
        taskLoading: { ...taskLoading, deleteTodo: true },
      });
      await deleteTodo(singleTodo.id);

      addToast(
        "Task has been deleted.",
        "success",
        "check-icon",
        "red",
        "bg-red-100"
      );
    } finally {
      useTodoStore.setState({
        taskLoading: { ...taskLoading, deleteTodo: false },
      });
    }
    handleHide(false);
  };

  const handleEditTodoTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    editTodo.title = value;
  };

  const handleUpdateTodo = async () => {
    // Check if "updateTodo" task is currently loading
    if (taskLoading.updateTodo) {
      return;
    }

    try {
      useTodoStore.setState({
        taskLoading: { ...taskLoading, updateTodo: true },
      });

      await updateTodo(singleTodo);
      addToast(
        "Task Updated successfully.",
        "success",
        "check-icon",
        "green",
        "bg-green-100"
      );
    } catch (error) {
      console.error("Error occurred during updateTodo:", error);
    } finally {
      useTodoStore.setState({
        taskLoading: { ...taskLoading, updateTodo: false },
      });

      handleEditOrDelete();
      handleHide(false);
    }
  };

  const handleUpdateTodoDate = (date: any) => {
    editTodo.date = date;
  };

  const handleUpdateStartTime = (time: any) => {
    // console.log(time.format("HH:mm")); // Get the selected time in HH:mm format

    editTodo.start_time = time.$d;
  };
  const handleUpdateStopTime = (time: any) => {
    editTodo.stop_time = time.$d;
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
                <span className="capitalize">
                  {formatDateRelativeToToday(singleTodo?.date)}{" "}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <span className="inline-flex text-[#3F5BF6]">
                  <BiTimeFive />
                </span>
                {formatTimeRange(singleTodo?.start_time, singleTodo?.stop_time)}
              </p>
            </div>

            <div className="mt-8">
              <div className="grid grid-cols-2 gap-3 w-full">
                <Button
                  onClick={handleDeleteTodo}
                  className="border rounded-md bg-white font-medium"
                >
                  {taskLoading.deleteTodo ? (
                    <span className="inline-flex items-center">
                      <Loading />
                      Deleting...
                    </span>
                  ) : (
                    "Delete"
                  )}
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
                  <DatePicker
                    value={editTodo.date}
                    handleDate={handleUpdateTodoDate}
                  />
                </div>
                <div className="">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label htmlFor="start_time" className="sr-only">
                        Time
                      </label>
                      <TimePickerValue
                        value={editTodo.start_time}
                        handleChange={handleUpdateStartTime}
                      />
                    </div>
                    <div>
                      <label htmlFor="stop_time" className="sr-only">
                        Time
                      </label>
                      <TimePickerValue
                        value={editTodo.stop_time}
                        handleChange={handleUpdateStopTime}
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
                  }}
                  className="bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium"
                >
                  {taskLoading.updateTodo ? (
                    <span className="inline-flex items-center">
                      <Loading />
                      Updating...
                    </span>
                  ) : (
                    "Save"
                  )}
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
