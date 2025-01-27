import { Box, TextField, Tooltip, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
import schema, { FormData } from "./schema"
import { useMutation } from "@apollo/client"
import { IRenamedColumn, renameColumnMutation } from "../../typedefs/column/renameColumn"
import { deleteColumnMutation, IDeletedColumn } from "../../typedefs/column/deleteColumn"
import { allColumnsQuery } from "../../typedefs/column/allColumns"
import { useState } from "react"
import { DeleteForever } from "@mui/icons-material"
import CustomModal from "../CustomModal"
import { editColumnForm, editColumnHeader } from "./styles"


interface IEditColumnProps {
  id: string
  name: string
  size: number
  refetch: VoidFunction
  close: VoidFunction
}

export const EditColumnForm = ({ id, name, size, refetch, close }: IEditColumnProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [isChanging, setIsChanging] = useState(false)
  const [renameColumn] = useMutation<IRenamedColumn>(renameColumnMutation)
  const [deleteColumn] = useMutation<IDeletedColumn>(deleteColumnMutation)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name }
  })

  const onSubmit = async ({ name }: FormData) => {
    setIsChanging(true)
    const data = { name, id }
    await renameColumn({ variables: data })

    refetch()
    setIsChanging(false)
  }

  const handleShowDeleteAlert = () => setShowDeleteAlert(true)
  const handleCloseDeleteAlert = () => setShowDeleteAlert(false)

  const handleDelete = async () => {
    await deleteColumn({
      variables: { id },
      refetchQueries: [allColumnsQuery],
    })
    setShowDeleteAlert(false)
    close()
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={editColumnForm}>
      <Box sx={editColumnHeader}>
        <Typography variant="h4" sx={{ fontSize: '1.5em' }}>
          {`${name} (${size} tasks)`}
        </Typography>
        <Tooltip title="Delete group">
          <Button disabled={isChanging} type="button" onClick={handleShowDeleteAlert}>
            <DeleteForever color="error" />
          </Button>
        </Tooltip>
      </Box>

      <TextField
        {...register("name")}
        defaultValue={name}
        disabled={isChanging}
        variant="standard"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        sx={{ width: '100%', mb: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isChanging}
        sx={{ maxWidth: '50%', mx: 'auto' }}
      >
        Save name
      </Button>

      <CustomModal
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        buttonClick={handleDelete}
        buttonText="Delete"
        disabled={isChanging}
      >
        <Typography sx={{ textAlign: 'center', pb: 3 }} color="error">
          Delete this column will delete all tasks inside!
        </Typography>
      </CustomModal>
    </Box>
  )
}
