// store.ts

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Todo } from "../typings/model";
import { addTodo, updateTodo, deleteTodo, getTodos } from "../api/apiRequest";

type TodoStore = {
  getAppTodo: () => void;
  appTodo: Todo[];
  todo: Todo[];
  paginatedTodo: Todo[];
  getPagination: () => void;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isModal: boolean;
  id: string;
  singleTodo: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
    start_time: string;
    stop_time: string;
    updatedAt: string;
  };
  setIsModal: (
    isModal: boolean,
    todo?: {
      id: string;
      title: string;
      completed: boolean;
      date: string;
      start_time: string;
      stop_time: string;
      updatedAt: string;
    }
  ) => void;
  deleteTodo: (id: string) => void;
  createTodo: (todo: {
    title: string;
    date: string;
    start_time: string;
    stop_time: string;
    updatedAt: string;
  }) => void;
  isCreateTodo: boolean;
  setCreateTodo: (isCreateTodo: boolean) => void;
  isEditTodo: boolean;
  updateTodo: (todo: {
    id: string;
    title: string;
    completed: boolean;
    date: string;
    start_time: string;
    stop_time: string;
    updatedAt: string;
  }) => void;
  setEditTodo: (isEditTodo: boolean) => void;
  taskLoading: {
    [key: string]: boolean;
  };
};
const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set, get) => ({
        appTodo: [] as Todo[],
        id: "",
        todo: [] as Todo[],
        paginatedTodo: [],
        currentPage: 1,
        itemsPerPage: 7,
        totalPages: 0,
        isModal: false,
        singleTodo: {
          id: "",
          title: "",
          completed: false,
          date: "",
          start_time: "",
          stop_time: "",
          updatedAt: "",
        },
        isCreateTodo: false,
        isEditTodo: false,
        setEditTodo: (isEditTodo: boolean) => {
          set({ isEditTodo: isEditTodo });
          set({ isCreateTodo: false });
          set({ isModal: false });
        },
        setCreateTodo: (isCreateTodo: boolean) => {
          set({ isCreateTodo: isCreateTodo });
          set({ isEditTodo: false });
          set({ isModal: false });
        },

        setIsModal: (
          isModal: boolean,
          todo?: {
            id: string;
            title: string;
            completed: boolean;
            date: string;
            start_time: string;
            stop_time: string;
            updatedAt: string;
          }
        ) => {
          set({ singleTodo: todo });
          set({ isModal: isModal });
          set({ isCreateTodo: false });
          set({ isEditTodo: false });
        },
        createTodo: async (todo: {
          title: string;
          date: string;
          start_time: string;
          stop_time: string;
          updatedAt: string;
        }) => {
          try {
            // Set loading state to true
            set((state) => ({
              taskLoading: { ...state.taskLoading, createTodo: true },
            }));

            const data = await addTodo(
              todo.title,
              todo.date,
              todo.start_time,
              todo.stop_time,
              todo.updatedAt
            );

            if (data) {
              set((state) => ({
                ...state,
                appTodo: [data, ...state.appTodo],
              }));
            }

            // Update paginatedTodo based on the current page
            const { currentPage, itemsPerPage, appTodo, getAppTodo } = get();
            await getAppTodo();
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentItems = appTodo.slice(
              indexOfFirstItem,
              indexOfLastItem
            );
            set({ paginatedTodo: currentItems });
          } finally {
            set((state) => ({
              taskLoading: { ...state.taskLoading, createTodo: false },
            }));
          }
        },

        deleteTodo: async (id: string) => {
          try {
            set((state) => ({
              taskLoading: { ...state.taskLoading, [id]: true },
            }));

            await deleteTodo(id);
            const newTodo = get().appTodo.filter((todo) => todo.id !== id);
            set({ appTodo: newTodo });

            const { currentPage, itemsPerPage, appTodo } = get();
            const indexOfLastItem = currentPage * itemsPerPage;
            const indexOfFirstItem = indexOfLastItem - itemsPerPage;
            const currentItems = appTodo.slice(
              indexOfFirstItem,
              indexOfLastItem
            );
            set({ paginatedTodo: currentItems });
          } finally {
            set((state) => ({
              taskLoading: { ...state.taskLoading, [id]: false },
            }));
          }
        },

        taskLoading: {},
        // update todo
        updateTodo: async (todo: {
          id: string;
          title: string;
          completed: boolean;
          date: string;
          start_time: string;
          stop_time: string;
          updatedAt: string;
        }) => {
          try {
            set((state) => ({
              taskLoading: { ...state.taskLoading, [todo.id!]: true },
            }));

            await updateTodo(
              todo.id,
              todo.title,
              todo.completed,
              todo.date,
              todo.start_time,
              todo.stop_time,
              todo.updatedAt
            );
            const newTodo = get().paginatedTodo.map((todos) => {
              if (todos.id === todo.id) {
                return {
                  ...todos,
                  id: todo.id,
                  title: todo.title,
                  completed: todo.completed,
                  date: todo.date,
                  start_time: todo.start_time,
                  stop_time: todo.stop_time,
                  updatedAt: todo.updatedAt,
                };
              }
              return todos;
            });

            set({ paginatedTodo: newTodo });
            set((state) => ({
              taskLoading: { ...state.taskLoading, [todo.id!]: false },
            }));
          } finally {
            set((state) => ({
              taskLoading: { ...state.taskLoading, [todo.id!]: false },
            }));
          }
        },
        getAppTodo: async () => {
          const res = await getTodos();
          set({ appTodo: res });
        },
        setCurrentPage: (page: number) => {
          set({ currentPage: page });
        },

        getPagination: async () => {
          const { currentPage, itemsPerPage, getAppTodo } = get();
          await getAppTodo();

          // Sort the todo array by date in descending order (newest first)
          const sortedTodo = get().appTodo.sort(
            (a, b) =>
              new Date(b.updatedAt!).getTime() -
              new Date(a.updatedAt!).getTime()
          );

          const indexOfLastItem = currentPage * itemsPerPage;
          const indexOfFirstItem = indexOfLastItem - itemsPerPage;
          const currentItems = sortedTodo.slice(
            indexOfFirstItem,
            indexOfLastItem
          );

          const totalPage = Math.ceil(sortedTodo.length / itemsPerPage);

          set({
            totalPages: totalPage,
            paginatedTodo: currentItems,
          });
        },
      }),
      {
        name: "todo-storage",
      }
    )
  )
);

export default useTodoStore;
