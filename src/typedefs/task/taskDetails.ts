import { gql } from "@apollo/client";
import { Status } from "./types";


export interface ITaskDetailsQuerie {
  id?: string
}

export const taskDetailsQuerie = gql`
  query($id: String!) {
    taskById (id: $id) {
      id
      title
      status
      position
      createdAt
      updatedAt
      column {
        id
        name
      }
    }
  }
`

export interface TaskColumnInfo {
  id: string
  name: string
}

export interface TaskDetails {
  id: string
  title: string
  status: Status
  position: number
  createdAt: Date
  updatedAt: Date
  column: TaskColumnInfo
}
