import { gql } from "@apollo/client";
import { Status } from "../task/types";

export interface IColumnDetailsQuery {
  id?: string
}

export const columnDetailsQuery = gql`
  query($id: String!) {
    columnById(data: { id: $id}) {
      id
      name
      tasks {
        id
        title
        status
        position
        columnId
      }
    }
  }
`;

interface TaskListItem {
  id: string
  title: string
  status: Status
  position: number
  columnId?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface IColumnDetails {
  columnById: {
    id: string
    name: string
    tasks: TaskListItem[]
  }
}
