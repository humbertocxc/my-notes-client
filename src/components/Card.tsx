import { Box, Checkbox, Typography } from "@mui/material"
import { Task } from "../../utils/todo"


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
      <Checkbox checked={task.done} />
    </Box>
  )
}

export default Card

