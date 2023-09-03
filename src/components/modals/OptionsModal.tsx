import useTodoStore from "../../store/useStore";
import { GrClose } from "react-icons/gr";
import { LuCalendar } from "react-icons/lu";
import { BiTimeFive } from "react-icons/bi";
import { Button } from "@nextui-org/react";

export default function OptionsModal() {
  const openModal = useTodoStore((state) => state.setIsModal);
  const openEditTodo = useTodoStore((state) => state.setEditTodo);
  const singleTodo = useTodoStore((state) => state.singleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleDeleteTodo = () => {
    console.log(singleTodo.id);
    deleteTodo(singleTodo.id);
    openModal(false);
  };

  return (
    <div className="w-full shadow-md flex flex-col p-5 text-sm border-gray-100 border rounded-md">
      <button onClick={() => openModal(false)} className="self-end text-xs">
        <GrClose />
      </button>
      <div className="flex flex-col ">
        <h3 className="mb-5 font-semibold">Title</h3>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-1">
            <span className="inline-flex">
              <LuCalendar />
            </span>
            20th January, 2023
          </p>
          <p className="flex items-center gap-1">
            <span className="inline-flex">
              <BiTimeFive />
            </span>
            8:00 - 10:00 AM
          </p>
        </div>

        <div className="flex self-center mt-8">
          <div className="flex gap-3">
            <Button
              onClick={handleDeleteTodo}
              className="px-[1em] lg:px-[3.5em] py-1.5 border rounded-md bg-white font-medium"
            >
              Delete
            </Button>
            <Button
              disabled={singleTodo.completed} 
              onClick={() => openEditTodo(true)}
              className={`bg-[#3F5BF6] text-white px-[1em] lg:px-[3.5em] py-1 border rounded-md font-medium ${
                singleTodo.completed ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
