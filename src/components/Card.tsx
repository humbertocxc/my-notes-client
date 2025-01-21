import { Box, Button, Checkbox, Typography } from "@mui/material"
import { gql, useMutation } from "@apollo/client";
import { Delete } from "@mui/icons-material";

export type Status = 'todo' | 'in_progress' | 'done'

export interface TaskCardProps {
  id: string
  title: string
  status: Status
  refetch: () => void
}

function Card({ title, status, id, refetch }: TaskCardProps) {
  const newStatus = status === 'done' ? 'todo' : 'done'
  const UPDATE_TASK_STATUS = gql`
    mutation {
      updateTaskStatus ( id: "${id}", status: "${newStatus}" ) {
        status
      }
    }
  `
  const DELETE_TASK = gql`
    mutation {
      deleteTask ( id: "${id}" ) {
        id
      }
    }
  `

  const [ updateTaskStatus ] = useMutation(UPDATE_TASK_STATUS)
  const [ deleteTask ] = useMutation(DELETE_TASK)

  const changeStatus = async () => {
    await updateTaskStatus()
    refetch()
  }

  const deleteTaskById = async () => {
    await deleteTask()
    refetch()
  }

  return (
    <Box sx={{
      borderStyle: 'solid', borderWidth: 1, borderRadius: 4, borderColor: 'divider', m: 1, p: 1,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={status === 'done'} onChange={changeStatus} />
        <Typography p={1}>{title}</Typography>
      </Box>
      <Button onClick={deleteTaskById}>
        <Delete />
      </Button>
    </Box>
  )
}

export default Card

