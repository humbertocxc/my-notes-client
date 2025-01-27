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
import { editColumnHeader } from "./styles"


interface IEditColumnProps {
  id: string
  name: string
  size: number
  refetch: VoidFunction
  close: VoidFunction
}

export const EditColumnForm = ({ id, name, size, refetch, close }: IEditColumnProps) => {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [renameColumn] = useMutation<IRenamedColumn>(renameColumnMutation)
  const [deleteColumn] = useMutation<IDeletedColumn>(deleteColumnMutation)

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name }
  })


  const onSubmit = async ({ name }: FormData) => {
    const data = { name, id }
    await renameColumn({ variables: data })

    refetch()
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 1.5, width: '100%' }}>
      <Box sx={editColumnHeader}>
        <Typography variant="h4" sx={{ fontSize: '1.5em' }}>
          {`${name} (${size} tasks)`}
        </Typography>
        <Tooltip title="Delete group">
          <Button type="button" onClick={handleShowDeleteAlert}>
            <DeleteForever color="error" />
          </Button>
        </Tooltip>
      </Box>

      <TextField
        {...register("name")}
        defaultValue={name}
        variant="standard"
        error={!!errors.name}
        helperText={errors.name ? errors.name.message : ""}
        sx={{ width: '100%' }}
      />

      <CustomModal
        isOpen={showDeleteAlert}
        onClose={handleCloseDeleteAlert}
        buttonClick={handleDelete}
        buttonText="Delete"
      >
        <Typography sx={{ textAlign: 'center', pb: 3 }} color="error">
          Delete this column will delete all tasks inside!
        </Typography>
      </CustomModal>
    </Box>
  )
}
