import { Box, Stack, TextField, Tooltip, Typography } from "@mui/material"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@mui/material"
import schema, { ColumnSchema } from "./schema"
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

  const onSubmit = async ({ name }: ColumnSchema) => {
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
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 1.5 }}>
      <Box sx={editColumnHeader}>
        <Typography variant="h4" sx={{ fontSize: '1.5em' }}>
          {`${name} (${size} tasks)`}
        </Typography>
        <Tooltip title="Delete column">
          <Button type="button" onClick={handleShowDeleteAlert}>
            <DeleteForever color="error" />
          </Button>
        </Tooltip>
      </Box>

      <Stack spacing={2} sx={{ display: 'flex', flexDirection: 'column' }}>
        <TextField
          {...register("name")}
          defaultValue={name}
          variant="standard"
          error={!!errors.name}
          helperText={errors.name ? errors.name.message : ""}
        />
        <Button type="submit">Save name</Button>
      </Stack>

      <CustomModal isOpen={showDeleteAlert} onClose={handleCloseDeleteAlert}>
        <Box sx={{ display: 'flex', flexDirection: 'column', py: 2 }}>
          <Typography sx={{ textAlign: 'center', pb: 3 }} color="error">
            Delete this column will delete all tasks inside!
          </Typography>
          <Button onClick={handleDelete}>Delete</Button>
        </Box>
      </CustomModal>
    </Box>
  )
}