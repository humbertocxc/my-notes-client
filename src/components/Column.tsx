import { Button, List, ListSubheader, Typography } from "@mui/material"
import Card from "./Card"
import { AddCircle } from "@mui/icons-material";
import useTaskMutations from "../hooks/useTaskMutations";
import useTaskQueries from "../hooks/useTaskQueries";

interface ColumnProps {
  name: string
  id: string
}

function Column({ name, id }: ColumnProps) {
  const { error, loading, refetch, taskList } = useTaskQueries({ columnId: id })
  const { createNewTask } = useTaskMutations({ columnId: id, refetch })

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  const handleRefetch = () => {
    refetch()
  }

  return (
    <List
      sx={{
        width: '100%', maxWidth: 540, border: 1, bgcolor: 'common.white', borderColor: 'divider', borderRadius: 3, p: 1.5
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, bgcolor: 'transparent', color: 'black' }}
        >
          <Typography variant="h3" sx={{ fontSize: '1.5em', pl: 0.5 }} >
            {name}
          </Typography>
          <Button onClick={createNewTask}>
            <AddCircle sx={{ color: 'primary' }} />
          </Button>
        </ListSubheader>
      }
    >
      {taskList?.tasksByColumn.map(task =>
        <Card key={task.id} {...task} status={task.status} refetch={handleRefetch} />
      )}
    </List>
  )
}

export default Column

