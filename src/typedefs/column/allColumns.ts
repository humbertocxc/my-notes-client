import { gql } from "@apollo/client";
import { TaskDetails } from "../task/taskDetails";


export const allColumnsQuery = gql`
  query {
    allColumns {
      id
      name
      size
    }
  }
`;

export interface IColumnList {
  allColumns: {
    name: string
    id: string
    size: number
    tasks?: TaskDetails[]
  }[]
}
