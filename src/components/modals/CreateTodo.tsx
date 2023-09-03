import useTodoStore from "../../store/useStore";
import { useState, useCallback } from "react";
import { GrClose } from "react-icons/gr";
import { Button } from "@nextui-org/react";


const CreateTodo: React.FC<{
  header: string;
}> = ({ header }) => {
  const openModal = useTodoStore((state) => state.setCreateTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const addTodo = useTodoStore((state) => state.createTodo);
  const editTodo = useTodoStore((state) => state.singleTodo);
  const [textareaValue, setTextareaValue] = useState<string>(
    editTodo?.title || ""
  );
  const [createTodo, setCreateTodo] = useState<string>("");


  const handleCreateTodo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCreateTodo(e.target.value);
  };

  const handleAddTodo = useCallback(() => {
    addTodo({
      title: createTodo,
      completed: false,
      userId: Math.floor(Math.random() * 1000),
    });
    openModal(false);
    setCreateTodo("");
  }, [addTodo, createTodo, openModal]);

  if (header === "Edit Task") {
    console.log(editTodo);
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };

  const handleSaveTodo = () => {
    updateTodo(editTodo.id, textareaValue, editTodo.completed);
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
            <div className="flex justify-between">
              <div>
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <input
                  className="border ring-1 ring-gray-300 w-[5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
                  type="date"
                  name="date"
                  id="date"
                />
              </div>

              <div>
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 w-[5.5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
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
                      className="border ring-1 ring-gray-300 w-[5.5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
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

          <div className="flex self-center mt-8">
            <div className="flex gap-3">
              <Button
                onClick={() => openModal(false)}
                className="px-12 py-1.5 border rounded-md bg-white font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveTodo}
                className="bg-[#3F5BF6] text-white px-12 py-1 border rounded-md font-medium"
              >
                Save
              </Button>
            </div>
          </div>
        </form>
      ) : (
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
              ></textarea>
            </div>
            <div className="flex justify-between">
              <div>
                <label htmlFor="date" className="sr-only">
                  Date
                </label>
                <input
                  className="border ring-1 ring-gray-300 w-[5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
                  type="date"
                  name="date"
                  id="date"
                />
              </div>
              <div>
                <div className="flex gap-3">
                  <div>
                    <label htmlFor="time" className="sr-only">
                      Time
                    </label>
                    <input
                      className="border ring-1 ring-gray-300 w-[5.5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
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
                      className="border ring-1 ring-gray-300 w-[5.5em] rounded-md focus:ring-0 focus:outline-none p-1 focus:border-sky-500 bg-gray-50"
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

          <div className="flex self-center mt-8">
            <div className="flex gap-3">
              <Button
                onClick={() => openModal(false)}
                className="px-12 py-1.5 border rounded-md bg-white font-medium"
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddTodo}
                className="bg-[#3F5BF6] text-white px-12 py-1 border rounded-md font-medium"
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTodo;