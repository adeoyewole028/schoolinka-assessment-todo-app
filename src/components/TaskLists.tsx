import React from "react";
import useTodoStore from "../store/useStore";
import Pagination from "../components/Pagination";
import Loading from "./Loading";
import {
  formatTimeRange,
  formatDateRelativeToToday,
} from "../lib/utils/timeFormatter";
const TaskLists: React.FC<{
  handleHide: (state: boolean, item: {}) => void;
  hide: boolean;
}> = ({ handleHide, hide }) => {
  const { paginatedTodo, taskLoading, setIsModal, updateTodo, appTodo } = useTodoStore();

  const handleCompleteCheck = (
    e: any,
    item: {
      id: string;
      title: string;
      completed: boolean;
      date: string;
      start_time: string;
      stop_time: string;
      updatedAt: string;
    }
  ) => {
    if (
      e.target.tagName.toLowerCase() !== "input" ||
      e.target.type !== "checkbox"
    ) {
      setIsModal(true, item);
      handleHide(true, item);
    } else {
      // Set loading state for the specific task
      useTodoStore.setState({
        taskLoading: { ...taskLoading, [item.id]: true },
      });
      const updatedTodo = {
        ...item,
        completed: !item.completed,
        id: item.id,
      };
      updateTodo(updatedTodo);
      setIsModal(false, item);
    }
  };

  return (
    <div>
      <h4 className="text-start mt-5 font-semibold">My Task</h4>
      <br />
      {appTodo.length > 0 ? (
        <div className="flex flex-col gap-5 w-full">
          {paginatedTodo.map((item) => (
            <div
              onClick={(e) => handleCompleteCheck(e, item)}
              key={item.id}
              className={`flex justify-between border rounded shadow bg-gray-100/75 hover:bg-blue-100 w-full p-2 items-center text-sm px-4 cursor-pointer`}
            >
              <div
                className={`flex gap-3 items-center ${
                  item.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {taskLoading[item.id] ? (
                  <Loading />
                ) : (
                  <input
                    onChange={(e) => handleCompleteCheck(e, item)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    type="checkbox"
                    checked={item.completed}
                  />
                )}

                <div className="flex flex-col">
                  <label className="capitalize">{item.title}</label>
                  <span>
                    <span>
                      {formatTimeRange(item.start_time, item.stop_time)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="capitalize">
                {formatDateRelativeToToday(item.updatedAt) ?? "Today"}
              </div>
            </div>
          ))}
          <div className="border-t py-2">
            {" "}
            <Pagination />
          </div>
        </div>
      ) : (
        <p className="text-center flex justify-center items-center font-medium">
          Your task list is empty! <br /> Please add some task for today
        </p>
      )}
    </div>
  );
};

export default TaskLists;
