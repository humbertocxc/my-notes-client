import { gql } from "@apollo/client";
import { Status } from "../task/types";

interface IColumnTypedefs {
  id?: string
}

export const columnDetailsQuery = ({ id }: IColumnTypedefs) => {
  const query = gql`
    query {
      columnById(data: { id: "${id}"}) {
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
  return query
}

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
