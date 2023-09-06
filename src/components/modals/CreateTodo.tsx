import useTodoStore from "../../store/useStore";
import {  useState } from "react";
import { GrClose } from "react-icons/gr";
import { BsBellFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import Loading from "../Loading";
import DatePicker from "../DatePicker";
import TimePicker from "../TimePicker";
import dayjs from "dayjs";

const CreateTodo: React.FC<{
  header: string;
  addToast: (
    message: string,
    type: string,
    icon: string,
    fill: string,
    background: string
  ) => void;
}> = ({ header, addToast }) => {
  const { setCreateTodo, createTodo, taskLoading, singleTodo, updateTodo } =
    useTodoStore();

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

  //   set error state
  const [error, setError] = useState<{
    title: string;
    date: string;
    less_date: string;
    start_time: string;
    stop_time: string;
  }>({
    title: "",
    date: "",
    less_date: "",
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
  const handleAddTodo = async () => {
    const newError: typeof error = { ...error }; // Create a new error object

    if (newTodo.title === "") {
      newError.title = "Title is required";
    } else {
      newError.title = ""; // Reset the error message if valid
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

    // Check if the selected date is less than today's date and time
    const currentDateTime = new Date().getTime();
    const [hour, minute] = newTodo.start_time.split(":").map(Number);
    // Create a new Date object
    const date = new Date(newTodo.date); // Year, month (0-based), day
    // Set the hours and minutes
    date.setHours(hour);
    date.setMinutes(minute);

    const selectedDateTime = date.getTime();
    if (selectedDateTime < currentDateTime) {
      console.log("Selected datetime is lesser");
      newError.less_date = "Selected date and time must be in the future";
    } else {
      newError.less_date = ""; // Reset the less_date error if date is valid
    }

    // Update the error state with the new error object
    setError(newError);

    // Check if any field has an error
    if (
      newError.title !== "" ||
      newError.date !== "" ||
      newError.start_time !== "" ||
      newError.stop_time !== "" ||
      newError.less_date !== ""
    ) {
      return;
    } else {
      if (taskLoading.createTodo) {
        return;
      }

      try {
        useTodoStore.setState({
          taskLoading: { ...taskLoading, createTodo: true },
        });

        await createTodo(newTodo);

        addToast(
          "Task Added successfully.",
          "success",
          "check-icon",
          "green",
          "bg-green-100"
        );
      } catch (error) {
        console.error("Error occurred during createTodo:", error);
      } finally {
        useTodoStore.setState({
          taskLoading: { ...taskLoading, createTodo: false },
        });
        setCreateTodo(false);
      }
    }
  };

  const handleEditTodoTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    singleTodo.title = value;
  };

  const handleCreateTodoDate = (date: any) => {
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

  const handleUpdateTodoDate = (date: any) => {
    singleTodo.date = date;
  };

  const handleUpdateStartTime = (time: any) => {
    console.log(time.$d);
    singleTodo.start_time = time.$d;
  };
  const handleUpdateStopTime = (time: any) => {
    singleTodo.stop_time = time.$d;
  };


  const handleUpdateTodo = async () => {
    const newError: typeof error = { ...error };
    const currentDateTime = dayjs();
    const selectedDate = dayjs(singleTodo.date);

    const selectedTime = dayjs(singleTodo.start_time).format("HH:mm");

    const selectedDateTime = dayjs(
      `${selectedDate.format("YYYY-MM-DD")}T${selectedTime}:00.000Z`
    ).subtract(1, "hour");


    if (selectedDateTime.isBefore(currentDateTime)) {
      newError.less_date = "Selected date and time must be in the future";
    } else {
      newError.less_date = "";
    }

    setError(newError);

    if (newError.less_date !== "") {
      return;
    } else {
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
      }
    }
  };

  return (
    <div className="w-full shadow-md flex flex-col p-5 text-sm border-gray-100 border rounded-md">
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold">{header}</h3>
        <button onClick={() => setCreateTodo(false)} className="text-xs">
          <GrClose />
        </button>
      </div>
      {singleTodo && header === "Edit Task" ? (
        // Edit todo
        <form className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <textarea
                className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-3 focus:border-sky-500 bg-gray-50"
                name="title"
                id="title"
                cols={30}
                rows={5}
                defaultValue={singleTodo.title}
                onChange={handleEditTodoTextArea}
              ></textarea>
              {error.less_date && (
                <p className="text-red-500 text-[0.7em]">{error.less_date}</p>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="col-span-5 lg:col-span-1">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <DatePicker
                  value={singleTodo.date}
                  handleDate={handleUpdateTodoDate}
                />
              </div>
              <div className="-z-50"></div>
              <div className="col-span-5 lg:col-span-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <label htmlFor="start_time" className="sr-only">
                      Time
                    </label>
                    <TimePicker
                      value={singleTodo.start_time}
                      handleChange={handleUpdateStartTime}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="stop_time" className="sr-only">
                      Time
                    </label>
                    <TimePicker
                      value={singleTodo.stop_time}
                      handleChange={handleUpdateStopTime}
                    />
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
                onClick={() => setCreateTodo(false)}
                className="border rounded-md bg-white font-medium w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateTodo}
                className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium w-full `}
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
      ) : (
        // Create todo
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
              {/* display error message */}
              {error.title && (
                <p className="text-red-500 text-[0.7em]">{error.title}</p>
              )}
              {error.less_date && (
                <p className="text-red-500 text-[0.7em]">{error.less_date}</p>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="col-span-5 lg:col-span-1">
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <DatePicker handleDate={handleCreateTodoDate} />
                {/* display error message */}
                {error.date && (
                  <p className="text-red-500 text-[0.7em]">{error.date}</p>
                )}
              </div>
              <div className="-z-50"></div>
              <div className="col-span-5 lg:col-span-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <TimePicker handleChange={handleCreateStartTime} />
                    {/*  display error message */}
                    {error.start_time && (
                      <p className="text-red-500 text-[0.7em]">
                        {error.start_time}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <TimePicker handleChange={handleCreateStopTime} />
                    {/*  display error message */}
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
                onClick={() => setCreateTodo(false)}
                className="border rounded-md bg-white font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTodo}
                className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium `}
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
      )}
    </div>
  );
};

export default CreateTodo;
