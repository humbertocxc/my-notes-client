import { gql } from "@apollo/client";

export interface ICreateColumnMutation {
  name?: string
}

export const createColumnMutation = gql`
  mutation($name: String!) {
    createColumn(data: { name: $name }) {
      id
      name
      size
    }
  }
`;

export interface ICreatedColumn {
  createColumn: {
    id: string
    name: string
    size?: number
  }
}

