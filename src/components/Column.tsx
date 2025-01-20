import { Button, List, ListSubheader, Typography } from "@mui/material"
import Card, { Status } from "./Card"
import { gql, useQuery } from "@apollo/client";
import { AddCircle } from "@mui/icons-material";

interface ColumnProps {
  title: Status
}

interface TaskListItem {
  id: string
  title: string
}

interface TaskStatusList {
  tasksByStatus: TaskListItem[]
}

function Column({ title }: ColumnProps) {
  const GET_TASKS = gql`
    query {
      tasksByStatus(taskStatusUniqueInput: { name: "${title}"}) {
        id
        title
      }
    }
  `;
  const { loading, error, data } = useQuery<TaskStatusList>(GET_TASKS);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  return (
    <List
      sx={{
        width: '100%', maxWidth: 540, border: 1, borderColor: 'divider', borderRadius: 3, p: 1.5
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          sx={{ display: 'flex', justifyContent: 'space-between', pt: 2, color: 'black' }}
        >
          <Typography variant="h3" sx={{ fontSize: '1.5em', pl: 0.5 }} >
            {title}
          </Typography>
          <Button>
            <AddCircle sx={{ color: 'divider' }} />
          </Button>
        </ListSubheader>
      }
    >
      {data?.tasksByStatus.map(task =>
        <Card key={task.id} {...task} status={title} />
      )}
    </List>
  )
}

export default Column

