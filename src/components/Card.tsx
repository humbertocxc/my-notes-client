import { Box, Button, Checkbox, Typography } from "@mui/material"
import { Delete } from "@mui/icons-material";
import { Status } from "../../lib/types";
import useTaskMutations from "../hooks/useTaskMutations";

export interface CardProps {
  id: string
  title: string
  status: Status
  refetch: () => void
}

function Card({ title, status, id, refetch }: CardProps) {
  const { changeStatus, deleteTaskById } = useTaskMutations({ id, status, refetch })

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

