import { gql } from "@apollo/client";

export interface IRenameColumnMutation {
  id?: string
}

export const renameColumnMutation = gql`
  mutation($id: String!, $name: String!) {
    renameColumn(data: { id: $id, name: $name }) {
      id
      name
    }
  }
`;

export interface IRenamedColumn {
  renameColumn: {
    id: string
    name: string
  }
}
