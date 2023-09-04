import { Button } from "@nextui-org/react";
import { Greet } from "./Greeting";
import { FiPlus } from "react-icons/fi";
import useTodoStore from "../store/useStore";

export default function Header() {
  const openCreateTodo = useTodoStore((state) => state.setCreateTodo);
  return (
    <div className="flex justify-between px-4 mt-20">
      <div className="">
        <Greet />

        <p className="text-base">You got some task to do. </p>
      </div>
      <div className="hidden md:flex">
        <Button
          onClick={() => openCreateTodo(true)}
          className="bg-[#3F5BF6] hover:bg-[#0E31F2] text-white px-4"
        >
          <span className="text-white">
            <FiPlus />
          </span>
          Create New Task
        </Button>
      </div>
    </div>
  );
}
