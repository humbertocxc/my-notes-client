import { gql } from '@apollo/client';
import { TaskColumnInfo } from './taskDetails';
import { Status } from './types';


interface ICreateTask {
  title: string
  columnId: string
}

export const createTaskMutation = ({ title, columnId }: ICreateTask) => {
  const mutation = gql`
    mutation {
      createTask(data: { title: "${title}", columnId: "${columnId}" }) {
        id
        title
        status
        position
        column {
          id
          name
        }
      }
    }
  `

  return mutation
};

export interface CreatedTask {
  id: string
  title: string
  status: Status
  position: number
  column: TaskColumnInfo
}
