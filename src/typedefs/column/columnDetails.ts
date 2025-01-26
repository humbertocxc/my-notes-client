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
      }
    }
  }
`;

interface TaskListItem {
  id: string
  title: string
  status: Status
  position: number
}

export interface IColumnDetails {
  columnById: {
    id: string
    name: string
    tasks: TaskListItem[]
  }
}
