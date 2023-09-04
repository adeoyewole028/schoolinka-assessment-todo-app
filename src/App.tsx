import { useEffect, useState } from "react";
import "./App.css";
import "flowbite";
import Nav from "./components/NavBar";
import Header from "./components/Header";
import SingleCalender from "./components/SingleCalender";
import TaskLists from "./components/TaskLists";
import useTodoStore from "../src/store/useStore";
import CreateTodo from "./components/modals/CreateTodo";
import OptionsModal from "./components/modals/DeleteOrEditModal";
import FullCalendar from "./components/FullCalender";
import InputTask from "./components/InputTask";
import AddTodoBottomDrawer from "./components/bottomDrawers/AddTodo";
import EditTodoBottomDrawer from "./components/bottomDrawers/EditTodo";

function App() {
  const getPaginatedTodo = useTodoStore((state) => state.getPagination);

  const openModal = useTodoStore((state) => state.isModal);

  const openCreateTodo = useTodoStore((state) => state.isCreateTodo);

  // console.log(openCreateTodo);

  const openEditTodo = useTodoStore((state) => state.isEditTodo);

  const [isTranslate, setTranslate] = useState<boolean>(false);
  const [isMobileEdit, setIsMobileEdit] = useState<boolean>(false);

  const handleTranslate = (state: boolean, item?: {}) => {
    setTranslate(state);
    // console.table(item);
  };

  const handleEditOnMobile = (state: boolean, item?: {}) => {
    // openModal(true);
    setIsMobileEdit(state);
  };

  useEffect(() => {
    getPaginatedTodo();
  }, [getPaginatedTodo]);

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div
        onClick={() => {
          handleTranslate(false);
          setIsMobileEdit(false);
        }}
        className={
          isTranslate || isMobileEdit
            ? "sm:hidden fixed backdrop top-0 bg-gray-900/30 w-full h-screen z-50 overflow-hidden"
            : ""
        }
      ></div>
      <Nav />
      <Header />
      <main className="mt-5 px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="col-span-2 w-full">
            <SingleCalender />
            <div className="pb-10">
              <TaskLists handleHide={handleEditOnMobile} hide={isTranslate} />
            </div>
          </div>
          <div className="w-full hidden sm:block">
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
      <footer className="sm:hidden  bg-white text-white fixed bottom-0 right-0 left-0 px-3 py-3">
        <InputTask handleHide={handleTranslate} />
      </footer>
      <AddTodoBottomDrawer handleHide={handleTranslate} hide={isTranslate} />
      <EditTodoBottomDrawer handleHide={handleEditOnMobile} hide={isMobileEdit} />
    </div>
  );
}

export default App;
