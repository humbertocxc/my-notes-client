import { Box, Button, Checkbox, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material";
import { Status } from "../typedefs/task/types";
import { useMutation } from "@apollo/client";
import { changeTaskInfoMutation, UpdatedTaskInfo } from "../typedefs/task/changeTaskInfo";
import { DeletedTaskInfo, deleteTaskMutation } from "../typedefs/task/deleteTask";

export interface CardProps {
  id: string
  title: string
  status: Status
  refetch: () => void
}

function Card({ title, status, id, refetch }: CardProps) {
  const newStatus = status === 'done' ? 'todo' : 'done'

  const [ changeStatus ] = useMutation<UpdatedTaskInfo>(changeTaskInfoMutation({ id, status: newStatus }))
  const [ deleteStatus ] = useMutation<DeletedTaskInfo>(deleteTaskMutation({ id }))

  const handleChangeStatus = () => {
    changeStatus()
    refetch()
  }

  const handleDeleteTask = () => {
    deleteStatus()
    refetch()
  }

  return (
    <Box sx={{
      borderStyle: 'solid', borderWidth: 1, borderRadius: 4, borderColor: 'divider', m: 1, p: 1,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={status === 'done'} onChange={handleChangeStatus} />
        <Typography p={1}>{title}</Typography>
      </Box>
      <Button onClick={handleDeleteTask}>
        <Delete />
      </Button>
    </Box>
  )
}

export default Card

