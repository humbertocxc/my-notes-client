import { gql } from '@apollo/client';
import { TaskColumnInfo } from './taskDetails';
import { Status } from './types';


export interface ICreateTask {
  title: string
  columnId: string
}

export const createTaskMutation = gql`
  mutation($title: String!, $columnId: String!) {
    createTask(data: { title: $title, columnId: $columnId }) {
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


export interface CreatedTask {
  id: string
  title: string
  status: Status
  position: number
  column: TaskColumnInfo
}
