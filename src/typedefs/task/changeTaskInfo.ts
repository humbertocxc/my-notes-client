import { gql } from "@apollo/client"
import { Status } from "./types"

export interface IChangeTaskInfo {
  id: string
  status?: Status
  title?: string
}

export const changeTaskInfoMutation = gql`
  mutation($id: String!, $status: String, $title: String) {
    updateTaskInfo(data: { id: $id, status: $status, title: $title }) {
      id
      title
      status
    }
  }
`

export interface UpdatedTaskInfo {
  id: string
  title: string
  status: string
}
