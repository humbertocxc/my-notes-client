import { Box, Typography } from "@mui/material"

interface Task {
  id: string
  title: string
}

interface ICard {
  task: Task
}

function Card({ task }: ICard) {
  return (
    <Box sx={{
      borderStyle: 'solid', borderWidth: 1, borderRadius: 4, borderColor: 'divider', m: 1, p: 1,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center'
    }}>
      <Typography p={1}>{task.title}</Typography>
    </Box>
  )
}

export default Card

