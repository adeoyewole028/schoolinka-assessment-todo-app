// apiRequest.ts

import { ID, account, database } from "./appwrite";
export const getSession = async () => {
  try {
    const session = await account.get();
    return session;
  } catch (error) {
    console.error("Error occurred during getSession:", error);
  }
};

export const getTodos = async () => {
  try {
    const data = await database.listDocuments(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      process.env.REACT_APP_PUBLIC_TODO_ID!
    );
    const todos = data.documents.map((todo) => {
      return {
        id: todo.$id,
        title: todo.title,
        completed: todo.completed,
        date: todo.date,
        start_time: todo.start_time,
        stop_time: todo.stop_time,
        updatedAt: todo.$updatedAt,
      };
    });

    return todos;
  } catch (error) {
    console.error("Error occurred during getTodos:", error);
  }
};

export const addTodo = async (
  title: string,
  date: string,
  start_time: string,
  stop_time: string,
  updatedAt: string
) => {
  try {
    const data = await database.createDocument(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      process.env.REACT_APP_PUBLIC_TODO_ID!,
      ID.unique(),
      {
        title: title,
        completed: false,
        date: date,
        start_time: start_time,
        stop_time: stop_time,
      }
    );
    const idMatch = data.$id.match(/\d+/g);
    const id = idMatch ? parseInt(idMatch.join("")) : 0;
    return {
      id: id,
      title: data.title,
      completed: data.completed,
      date: data.date,
      start_time: data.start_time,
      stop_time: data.stop_time,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error("Error occurred during addTodo:", error);

    return null;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await database.deleteDocument(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      process.env.REACT_APP_PUBLIC_TODO_ID!,
      id
    );
    return id;
  } catch (error) {
    console.error("Error occurred during deleteTodo:", error);
    return null;
  }
};

export const updateTodo = async (
  id: string,
  title: string,
  completed: boolean,
  date: string,
  start_time: string,
  stop_time: string,
  updateAt: string
) => {
  try {
    const data = await database.updateDocument(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      process.env.REACT_APP_PUBLIC_TODO_ID!,
      id,
      {
        title: title,
        completed: completed,
        date: date,
        start_time: start_time,
        stop_time: stop_time,
      }
    );
    return {
      id: id,
      title: data.title,
      completed: data.completed,
      date: data.date,
      start_time: data.start_time,
      stop_time: data.stop_time,
      updatedAt: data.updatedAt,
    };
  } catch (error) {
    console.error("Error occurred during updateTodo:", error);
    return null;
  }
};

export const updateAllTodos = async (completed: boolean) => {
  try {
    const data = await database.updateDocument(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      process.env.REACT_APP_PUBLIC_TODO_ID!,
      "*",
      {
        completed: completed,
      }
    );
    return data;
  } catch (error) {
    console.error("Error occurred during updateAllTodos:", error);
    return null;
  }
};

export const deleteAllTodos = async () => {
  try {
    const data = await database.deleteDocument(
      process.env.REACT_APP_PUBLIC_DATABASE_ID!,
      "*",
      process.env.REACT_APP_PUBLIC_TODO_ID!
    );
    return data;
  } catch (error) {
    console.error("Error occurred during deleteAllTodos:", error);
    return null;
  }
};
