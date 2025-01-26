import { gql } from "@apollo/client";


export const allColumnsQuery = gql`
  query {
    allColumns {
      id
      name
    }
  }
`;

export interface IColumnList {
  allColumns: {
    name: string
    id: string
  }[]
}
