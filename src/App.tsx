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
import AddTodoBottomDrawer from "./components/bottomDrawers/AddTodoBottomDrawer";
import EditTodoBottomDrawer from "./components/bottomDrawers/EditTodoBottomDrawer";
import Toast from "./components/toastsNotification/Toast";

function App() {
  const { getPagination, isModal, isCreateTodo, isEditTodo } = useTodoStore();

  const [isMobileAdd, setIsMobileAdd] = useState<boolean>(false);
  const [isMobileEdit, setIsMobileEdit] = useState<boolean>(false);
  const [isEditingTodo, setIsEditingTodo] = useState<boolean>(false);
  const [editOrDelete, setEditOrDelete] = useState<boolean>(true);

  const handleEditOrDelete = () => {
    setIsEditingTodo(false);
    setEditOrDelete(true);
  };

  const openEditTodo = () => {
    setIsEditingTodo(true);
    setEditOrDelete(false);
  };

  const handleAddOnMobile = (state: boolean, item?: {}) => {
    setIsMobileAdd(state);
  };

  const handleEditOnMobile = (state: boolean, item?: {}) => {
    setIsMobileEdit(state);
  };

  const [toasts, setToasts] = useState<
    {
      id: string;
      message: string;
      type: string;
      icon: string;
      fill: string;
      background: string;
    }[]
  >([]);

  const addToast = (
    message: string,
    type: string,
    icon: string,
    fill: string,
    background: string
  ) => {
    const id = Date.now().toString(); // Generate a unique ID for the toast
    const newToast = {
      id,
      message,
      type,
      icon,
      fill,
      background,
    };

    setToasts((prevToasts) => [...prevToasts, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    getPagination();
  }, [getPagination]);

  return (
    <div className="mx-auto max-w-7xl pb-10">
      <div
        onClick={() => {
          handleAddOnMobile(false);
          setIsMobileEdit(false);
          handleEditOrDelete();
        }}
        className={
          isMobileAdd || isMobileEdit
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
              <TaskLists handleHide={handleEditOnMobile} hide={isMobileAdd} />
            </div>
          </div>
          <div className="w-full hidden sm:block">
            {isModal ? (
              <OptionsModal addToast={addToast} />
            ) : isCreateTodo ? (
              <CreateTodo header="Add Task" addToast={addToast} />
            ) : isEditTodo ? (
              <CreateTodo header="Edit Task" addToast={addToast} />
            ) : (
              <FullCalendar />
            )}
          </div>
        </div>
      </main>
      <footer className="sm:hidden  bg-white text-white fixed bottom-0 right-0 left-0 px-3 py-3">
        <InputTask handleHide={handleAddOnMobile} />
      </footer>
      <AddTodoBottomDrawer
        handleHide={handleAddOnMobile}
        hide={isMobileAdd}
        addToast={addToast}
      />
      <EditTodoBottomDrawer
        handleHide={handleEditOnMobile}
        hide={isMobileEdit}
        addToast={addToast}
        isEditingTodo={isEditingTodo}
        handleEditOrDelete={handleEditOrDelete}
        editOrDelete={editOrDelete}
        openEditTodo={openEditTodo}
      />
      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
