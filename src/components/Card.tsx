import { Box, Button, Checkbox, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Draggable } from "@hello-pangea/dnd";
import { Status } from "../typedefs/task/types";
import { changeTaskInfoMutation, IChangeTaskInfo } from "../typedefs/task/changeTaskInfo";
import { deleteTaskMutation, IDeleteTask } from "../typedefs/task/deleteTask";

export interface CardProps {
  id: string
  title: string
  status: Status
  position: number
  refetch: () => void
}

function Card({ title, status, id, position, refetch }: CardProps) {
  const [changeStatus] = useMutation<IChangeTaskInfo>(changeTaskInfoMutation)
  const [deleteStatus] = useMutation<IDeleteTask>(deleteTaskMutation)

  const handleChangeStatus = async () => {
    const newData = {
      id,
      status: status === 'done' ? 'todo' : 'done',
    }
    await changeStatus({ variables: newData })
    refetch()
  }

  const handleDeleteTask = async () => {
    await deleteStatus({ variables: { id } })
    refetch()
  }

  return (
    <Draggable draggableId={id} index={position}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            borderStyle: 'solid', borderWidth: 1, borderRadius: 4, borderColor: 'divider', m: 1, p: 1,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox checked={status === 'done'} onChange={handleChangeStatus} />
            <Typography p={1}>{title}</Typography>
          </Box>
          <Button onClick={handleDeleteTask}>
            <Delete />
          </Button>
        </Box>
      )}
    </Draggable>
  )
}

export default Card

