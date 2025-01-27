import { Box, Button, Checkbox, Tooltip } from "@mui/material"
import { Delete } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Status } from "../../typedefs/task/types";
import { changeTaskInfoMutation, IChangeTaskInfo } from "../../typedefs/task/changeTaskInfo";
import { deleteTaskMutation, IDeleteTask } from "../../typedefs/task/deleteTask";
import schema, { FormData } from "./schema";
import { cardStyles, CleanInput } from "./styles";

export interface CardProps {
  id: string
  title: string
  status: Status
  position: number
  refetch: () => void
}

function Card({ title: cardTitle, status, id, position, refetch }: CardProps) {
  const [changeStatus] = useMutation<IChangeTaskInfo>(changeTaskInfoMutation)
  const [deleteStatus] = useMutation<IDeleteTask>(deleteTaskMutation)
  const [isChanging, setIsChanging] = useState(false)

  const { register, watch, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: cardTitle, status: status === 'done' },
  })

  const handleUpdateTask = async ({ title }: FormData) => {
    setIsChanging(true)
    const newData = { id, title }
    await changeStatus({ variables: newData })

    refetch()
    setIsChanging(false)
  }

  const handleDeleteTask = async () => {
    setIsChanging(true)
    await deleteStatus({ variables: { id } })
    refetch()
    setIsChanging(false)
  }

  const onSubmit = (data: FormData) => {
    handleUpdateTask(data)
  }

  const updateStatus = async () => {
    setIsChanging(true)

    const data = { id, status: status === 'done' ? 'todo' : 'done' }
    await changeStatus({ variables: data })

    setIsChanging(false)
  }

  return (
    <Draggable draggableId={id} index={position}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={cardStyles}
        >
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              disabled={isChanging}
              checked={status === 'done'}
              onChange={updateStatus}
            />
            <Tooltip title={watch('title')}>
              <CleanInput
                disabled={isChanging}
                variant="standard"
                sx={{ borderBottom: `${watch("title") === cardTitle ? "none" : "solid 1px"}` }}
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title ? errors.title.message : ""}
              />
            </Tooltip>
            <button hidden type="submit" />
          </Box>
          <Button disabled={isChanging} onClick={handleDeleteTask}>
            <Delete />
          </Button>
        </Box>
      )}
    </Draggable>
  )
}

export default Card

