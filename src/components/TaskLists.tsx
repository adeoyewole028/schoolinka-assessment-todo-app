import React from "react";
import useTodoStore from "../store/useStore";
import Pagination from "../components/Pagination";

const TaskLists: React.FC<{
  handleHide: (state: boolean, item: {}) => void;
  hide: boolean;
}> = ({ handleHide, hide }) => {
  const todo = useTodoStore((state) => state.paginatedTodo);
  const openModal = useTodoStore((state) => state.setIsModal);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  const handleCompleteCheck = (
    e: any,
    item: {
      id: number;
      title: string;
      completed: boolean;
      userId: number;
    }
  ) => {
    if (
      e.target.tagName.toLowerCase() !== "input" ||
      e.target.type !== "checkbox"
    ) {
      //   console.log("is modal");
      openModal(true, item);
      handleHide(true, item);
    } else {
      try {
        const updatedTodo = { ...item, completed: !item.completed };
        updateTodo(item.id, updatedTodo.title, updatedTodo.completed);
        openModal(false, item);
        // console.log("is updated");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h4 className="text-start mt-5 font-semibold">My Task</h4>
      <br />
      <div className="flex flex-col gap-5 w-full">
        {todo.map((item) => (
          <div
            onClick={(e) => handleCompleteCheck(e, item)}
            key={item.id}
            className={`flex justify-between border rounded shadow bg-gray-100/75 w-full p-2 items-center text-sm px-4 cursor-pointer`}
          >
            <div
              className={`flex gap-3 items-center ${
                item.completed ? "line-through text-gray-400" : ""
              }`}
            >
              <input
                onChange={(e) => handleCompleteCheck(e, item)}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                type="checkbox"
                checked={item.completed}
              />
              <div className="flex flex-col">
                <label>{item.title}</label>
                <span>date and time</span>
              </div>
            </div>
            <div>Today</div>
          </div>
        ))}
        <div className="border-t py-2">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default TaskLists;
