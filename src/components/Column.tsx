import { List, ListSubheader } from "@mui/material"
import { Column as IColumn } from "../../utils/todo"
import Card from "./Card"


function Column({ tasks, title }: IColumn) {

  return (
    <List
      sx={{
        width: '100%', maxWidth: 540, border: 1, borderColor: 'divider', borderRadius: 3, padding: 1
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          {title}
        </ListSubheader>
      }
    >
      {tasks.map(task =>
        <Card task={task} key={task.id} />
      )}
    </List>
  )
}

export default Column

