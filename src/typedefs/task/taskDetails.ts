import { gql } from "@apollo/client";
import { Status } from "./types";


interface IUseTaskQueries {
  id?: string
}

export const taskDetailsQuerie = ({ id }: IUseTaskQueries) => {
  const query = gql`
    query {
      taskById (id: "${id}") {
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

  return query
}

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
