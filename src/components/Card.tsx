import { Box, Button, Checkbox, Typography } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export type Status = 'To Do' | 'In Progress' | 'Done'

export interface TaskCard {
  id: string
  title: string
  status: Status
}

function Card({ title, status }: TaskCard) {
  return (
    <Box sx={{
      borderStyle: 'solid', borderWidth: 1, borderRadius: 4, borderColor: 'divider', m: 1, p: 1,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={status != 'To Do'} disabled={status === "Done"} color="success" />
        <Typography p={1}>{title}</Typography>
      </Box>
      <Button>
        <MoreVertIcon sx={{ color: 'black' }} />
      </Button>
    </Box>
  )
}

export default Card

