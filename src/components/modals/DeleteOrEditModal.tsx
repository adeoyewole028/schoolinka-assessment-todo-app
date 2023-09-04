import useTodoStore from "../../store/useStore";
import { GrClose } from "react-icons/gr";
import { LuCalendar } from "react-icons/lu";
import { BiTimeFive } from "react-icons/bi";
import { Button } from "@nextui-org/react";

const OptionsModal: React.FC<{
  addToast: (
    id: string,
    message: string,
    type: string,
    icon: string,
    fill: string,
    background: string
  ) => void;
}> = ({ addToast }) => {
  const openModal = useTodoStore((state) => state.setIsModal);
  const openEditTodo = useTodoStore((state) => state.setEditTodo);
  const singleTodo = useTodoStore((state) => state.singleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const handleDeleteTodo = () => {
    console.log(singleTodo.id);
    deleteTodo(singleTodo.id);
    addToast(
      "toast-danger",
      "Task has been deleted.",
      "success",
      "check-icon",
      "red",
      "bg-red-100"
    );
    openModal(false);
  };

  return (
    <div className="w-full shadow-md flex flex-col p-5 text-sm border-gray-100 border rounded-md">
      <button onClick={() => openModal(false)} className="self-end text-xs">
        <GrClose />
      </button>
      <div className="flex flex-col ">
        <h3 className="mb-5 font-semibold capitalize">{singleTodo.title}</h3>
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
              disabled={singleTodo.completed}
              onClick={() => openEditTodo(true)}
              className={`bg-[#3F5BF6] hover:bg-[#0E31F2] text-white border rounded-md font-medium ${
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
};

export default OptionsModal;
