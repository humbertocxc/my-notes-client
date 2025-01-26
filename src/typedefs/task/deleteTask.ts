import { gql } from "@apollo/client"

export interface IDeleteTask {
  id: string
}

export const deleteTaskMutation = gql`
  mutation($id: String!) {
    deleteTask(data: {id: $id}) {
      id
      title
    }
  }
`;

