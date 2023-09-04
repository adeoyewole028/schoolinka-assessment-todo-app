import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Todo } from "../typings/model";

type TodoStore = {
  todo: Todo[];
  getTodo: () => void;
  loading: boolean;
  paginatedTodo: Todo[];
  getPagination: () => void;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  isModal: boolean;
  id: number;
  singleTodo: {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
  };
  setIsModal: (
    isModal: boolean,
    singleTodo?: {
      id: number;
      userId: number;
      title: string;
      completed: boolean;
    }
  ) => void;
  deleteTodo: (id: number) => void;
  createTodo: (todo: {
    title: string;
    completed: boolean;
    userId: number;
  }) => void;
  isCreateTodo: boolean;
  setCreateTodo: (isCreateTodo: boolean) => void;
  isEditTodo: boolean;
  updateTodo: (id: number, title: string, completed: boolean) => void;
  setEditTodo: (isEditTodo: boolean) => void;
  taskLoading: {
    [key: number]: boolean;
  };
};
const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      (set, get) => ({
        id: 0,
        todo: [] as Todo[],
        paginatedTodo: [],
        currentPage: 1,
        itemsPerPage: 7,
        totalPages: 0,
        isModal: false,
        singleTodo: {
          id: 0,
          userId: 0,
          title: "",
          completed: false,
        },
        loading: true,
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
          singleTodo?: {
            id: number;
            userId: number;
            title: string;
            completed: boolean;
          }
        ) => {
          set({ singleTodo: singleTodo });
          set({ isModal: isModal });
          set({ isCreateTodo: false });
          set({ isEditTodo: false });
        },

        getTodo: async () => {
          try {
            set({ loading: true });
            const res = await fetch(
              "https://jsonplaceholder.typicode.com/todos",
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            const data = await res.json();
            if (data) {
              set({ todo: data });
              set({ loading: false });
            }
          } catch (err) {
            console.log(err);
            set({ loading: false });
          }
        },

        createTodo: async (todo: {
          title: string;
          completed: boolean;
          userId: number;
        }) => {
          try {
            set({ loading: true });
            const res = await fetch(
              "https://jsonplaceholder.typicode.com/todos",
              {
                method: "POST",
                body: JSON.stringify({
                  title: todo.title,
                  completed: todo.completed,
                  userId: todo.userId,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (res.status !== 201) {
              throw new Error("Failed to create todo");
            } else {
              const data = await res.json();
              console.log(data, "new data");

              // Add the new task to the beginning of the todo array
              set((state) => ({ todo: [data, ...state.todo] }));

              // Update paginatedTodo based on the current page
              const { currentPage, itemsPerPage, todo } = get();
              const indexOfLastItem = currentPage * itemsPerPage;
              const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              const currentItems = todo.slice(
                indexOfFirstItem,
                indexOfLastItem
              );
              set({ paginatedTodo: currentItems });

              set({ loading: false });
            }
          } catch (err) {
            console.log(err);
            set({ loading: false });
          }
        },

        deleteTodo: async (id: number) => {
          try {
            set({ loading: true });
            const res = await fetch(
              `https://jsonplaceholder.typicode.com/todos/${id}`,
              {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (res.status !== 200) {
              throw new Error("Failed to delete todo");
            } else {
              const newTodo = get().todo.filter((todo) => todo.id !== id);
              set({ todo: newTodo });

              const { currentPage, itemsPerPage, todo } = get();
              const indexOfLastItem = currentPage * itemsPerPage;
              const indexOfFirstItem = indexOfLastItem - itemsPerPage;
              const currentItems = todo.slice(
                indexOfFirstItem,
                indexOfLastItem
              );
              set({ paginatedTodo: currentItems });

              set({ loading: false });
            }
          } catch (err) {
            console.log(err);
            set({ loading: false });
          }
        },

        taskLoading: {},
        // update todo
        updateTodo: async (id: number, title: string, completed: boolean) => {
          try {
            set({ loading: true });
            set((state) => ({
              taskLoading: { ...state.taskLoading, [id]: true },
            }));

            const res = await fetch(
              `https://jsonplaceholder.typicode.com/posts/${id}`,
              {
                method: "PATCH",
                body: JSON.stringify({
                  title: title,
                  completed: completed,
                }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              }
            );

            const data = await res.json();
            console.log(data, "new update");
            set({ loading: false });
            console.log(get().loading);
            // update paginated data
            const newTodo = get().paginatedTodo.map((todo) => {
              if (todo.id === id) {
                return {
                  ...todo,
                  title: title,
                  completed: completed,
                };
              }
              return todo;
            });
            set({ paginatedTodo: newTodo });
            set((state) => ({
              taskLoading: { ...state.taskLoading, [id]: false },
            }));
          } catch (err) {
            console.log(err);
            set({ loading: false });
            set((state) => ({
              taskLoading: { ...state.taskLoading, [id]: false },
            }));
          }
        },

        setCurrentPage: (page: number) => {
          set({ currentPage: page });
        },

        getPagination: async () => {
          const { currentPage, itemsPerPage, getTodo } = get();
          await getTodo();

          // Sort the todo array by id in descending order (newest first)
          const sortedTodo = get().todo.sort((a, b) => b.id - a.id);

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
