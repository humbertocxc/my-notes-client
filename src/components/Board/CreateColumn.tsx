import { AddCircle } from "@mui/icons-material"
import { Box, Button, TextField, Tooltip, Typography } from "@mui/material"
import CustomModal from "../CustomModal"
import { useState } from "react"
import { useMutation } from "@apollo/client"
import { createColumnMutation, ICreatedColumn } from "../../typedefs/column/createColumn"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import schema, { FormData } from "../Column/schema"
import { allColumnsQuery } from "../../typedefs/column/allColumns"

export const CreateColumn = () => {
  const [createColumn] = useMutation<ICreatedColumn>(createColumnMutation)
  const [showModal, setShowModal] = useState(false)
  const [creating, setCreating] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: '' }
  });

  const handleToggleModal = () => setShowModal(!showModal);

  const onSubmit = async ({ name }: FormData) => {
    setCreating(true)
    await createColumn({
      variables: { name },
      refetchQueries: [allColumnsQuery]
    });
    setCreating(false)
    setShowModal(false)
  };

  return (
    <Box>
      <Tooltip title="Create new group">
        <Button onClick={handleToggleModal} sx={{ mt: '30vh', ml: 3 }}>
          <AddCircle sx={{ fontSize: '4em' }} />
        </Button>
      </Tooltip>
      <CustomModal isOpen={showModal} onClose={handleToggleModal} hideButton >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2, width: '100%' }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography sx={{ mb: 2 }}>
            Create new Group
          </Typography>
          <TextField
            {...register("name")}
            variant="standard"
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            sx={{ width: '100%' }}
          />
          <Button sx={{ mt: 3 }} type="submit" variant="contained" color="primary" disabled={creating}>
            Create
          </Button>
        </Box>
      </CustomModal>
    </Box>
  )
}
