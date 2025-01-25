import { gql } from "@apollo/client";


export const allColumnsQuery = () => {
  const query = gql`
    query {
      allColumns {
        id
        name
      }
    }
  `;

  return query
}

export interface IColumnList {
  allColumns: {
    name: string
    id: string
  }[]
}
