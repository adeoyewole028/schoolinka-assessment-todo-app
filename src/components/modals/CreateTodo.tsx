import useTodoStore from "../../store/useStore";
import { useState, useEffect } from "react";
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
  const openModal = useTodoStore((state) => state.setCreateTodo);
  const isLoading = useTodoStore((state) => state.loading);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const addTodo = useTodoStore((state) => state.createTodo);
  const editTodo = useTodoStore((state) => state.singleTodo);
  const [textareaValue, setTextareaValue] = useState<string>(
    editTodo?.title || ""
  );
  const [createTodo, setCreateTodo] = useState<string>("");
  const [toastTimeout, setToastTimeout] = useState<NodeJS.Timeout | null>(null);
  useEffect(() => {
    return () => {
      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }
    };
  }, [toastTimeout]);

  const handleCreateTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (createTodo === "") {
      return;
    } else {
      addTodo({
        title: createTodo,
        completed: false,
        userId: Math.floor(Math.random() * 1000),
      });

      if (toastTimeout) {
        clearTimeout(toastTimeout);
      }

      const newTimeout = setTimeout(() => {
        addToast(
          "Task Added successfully.",
          "success",
          "check-icon",
          "green",
          "bg-green-100"
        );
      }, 2000);

      setToastTimeout(newTimeout);

      setCreateTodo("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleUpdateTodo = () => {
    console.log(isLoading, "task");
    updateTodo(editTodo.id, textareaValue, editTodo.completed);

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

    setToastTimeout(newTimeout);
  };

  return (
    <div className="w-full shadow-md flex flex-col p-5 text-sm border-gray-100 border rounded-md">
      <div className="flex items-center justify-between pb-5">
        <h3 className="font-semibold">{header}</h3>
        <button onClick={() => openModal(false)} className="text-xs">
          <GrClose />
        </button>
      </div>
      {editTodo && header === "Edit Task" ? (
        // Edit todo
        <form className="flex flex-col">
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <textarea
                className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-3 focus:border-sky-500 bg-gray-50"
                name="edit"
                id="edit"
                cols={30}
                rows={5}
                value={textareaValue}
                onChange={handleChange}
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
                      name="time"
                      id="time"
                    />
                  </div>
                  <div className="">
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 w-full text-sm"
                      type="time"
                      name="time"
                      id="time"
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
                onClick={() => openModal(false)}
                className="border rounded-md bg-white font-medium w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateTodo}
                className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium w-full ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                <span> {isLoading && <Loading />}</span> Save
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
                name="create"
                id="create"
                cols={30}
                rows={5}
                value={createTodo}
                onChange={handleCreateTodo}
                placeholder="Add task for today"
              ></textarea>
              {/* {createTodo === "" ? <small>Please add a task</small> : ""} */}
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
                      name="time"
                      id="time"
                    />
                  </div>
                  <div>
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 w-full rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50 text-sm"
                      type="time"
                      name="time"
                      id="time"
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
                onClick={() => openModal(false)}
                className="border rounded-md bg-white font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTodo}
                className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                <span> {isLoading && <Loading />}</span> Add
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTodo;
