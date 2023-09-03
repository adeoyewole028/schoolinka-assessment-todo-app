import { useEffect } from "react";
import "./App.css";
import "flowbite";
import Nav from "./components/NavBar";
import Header from "./components/Header";
import SingleCalender from "./components/SingleCalender";
import TaskLists from "./components/TaskLists";
import useTodoStore from "../src/store/useStore";
import CreateTodo from "./components/modals/CreateTodo";
import OptionsModal from "./components/modals/OptionsModal";
import FullCalendar from "./components/FullCalender";

function App() {
  const getPaginatedTodo = useTodoStore((state) => state.getPagination);
  const openModal = useTodoStore((state) => state.isModal);
  const openCreateTodo = useTodoStore((state) => state.isCreateTodo);
  console.log(openCreateTodo);
  const openEditTodo = useTodoStore((state) => state.isEditTodo);
  useEffect(() => {
    getPaginatedTodo();
  }, [getPaginatedTodo]);
  return (
    <div className="mx-auto max-w-7xl pb-10">
      <Nav />
      <Header />
      <main className="mt-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <SingleCalender />
            <div className="">
              <TaskLists />
            </div>
          </div>
          <div className="w-full">
            {openModal ? (
              <OptionsModal />
            ) : openCreateTodo ? (
              <CreateTodo header="Add Task" />
            ) : openEditTodo ? (
              <CreateTodo header="Edit Task" />
            ) : (
              <FullCalendar />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
