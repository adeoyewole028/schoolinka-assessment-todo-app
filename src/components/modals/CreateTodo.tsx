import useTodoStore from "../../store/useStore";
import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { Button } from "@nextui-org/react";
import Loading from "../Loading";

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

  const handleCreateTodoTextarea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleCreateTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const handleAddTodo = async () => {
    if (
      newTodo.title === "" ||
      newTodo.date === "" ||
      newTodo.start_time === "" ||
      newTodo.stop_time === ""
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
      }
    }
  };

  const handleEditTodoTextArea = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    singleTodo.title = value;
  };

  const handleEditTodoInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    (singleTodo as any)[name] = value;
  };

  const handleUpdateTodo = async () => {
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
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="col-span-5 lg:col-span-1">
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
              <div className="-z-50"></div>
              <div className="col-span-5 lg:col-span-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="">
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 w-full text-sm"
                      type="time"
                      name="start_time"
                      id="time"
                      onChange={handleEditTodoInput}
                    />
                  </div>
                  <div className="">
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 w-full text-sm"
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
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="col-span-5 lg:col-span-1">
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
              <div className="-z-50"></div>
              <div className="col-span-5 lg:col-span-3">
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
