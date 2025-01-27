import { gql } from "@apollo/client";

export interface IDeleteColumnMutation {
  id?: string
}

export const deleteColumnMutation = gql`
  mutation($id: String!) {
    deleteColumn(data: { id: $id }) {
      id
      name
    }
  }
`;

export interface IDeletedColumn {
  renameColumn: {
    id: string
    name: string
  }
}

