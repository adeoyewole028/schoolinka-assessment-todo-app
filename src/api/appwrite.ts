"use client"
import { Client, Account, ID, Databases, Storage, Graphql } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject(process.env.REACT_APP_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);
const graphql = new Graphql(client);

export { client, account, database, storage, ID, graphql };
