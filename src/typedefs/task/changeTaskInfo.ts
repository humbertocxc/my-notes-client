import { gql } from "@apollo/client"
import { Status } from "./types"

interface IChangeTaskInfo {
  id: string
  status?: Status
  title?: string
}

export const changeTaskInfoMutation = ({ id, status, title }: IChangeTaskInfo) => {
  const fields = [`id: "${id}" `]

  if (title !== undefined && title !== '') {
    fields.push(`title: "${title}"`)
  }

  if (status !== undefined) {
    fields.push(`status: "${status}"`)
  }

  const data = fields.join(", ")

  const mutation = gql`
    mutation {
      updateTaskInfo(data: { ${data} }) {
        id
        title
        status
      }
    }
  `;

  return mutation
}

export interface UpdatedTaskInfo {
  id: string
  title: string
  status: string
}
