import { gql } from "@apollo/client"

interface IDeleteTask {
  id: string
}

export const deleteTaskMutation = ({ id }: IDeleteTask) => {
  const mutation = gql`
    mutation {
      deleteTask(data: {id: "${id}"}) {
        id
        title
      }
    }
  `;

  return mutation
}

export interface DeletedTaskInfo {
  id: string
  title: string
}

