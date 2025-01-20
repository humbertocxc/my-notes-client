import { List, ListSubheader } from "@mui/material"
import Card from "./Card"
import { gql, useQuery } from "@apollo/client";

interface ColumnProps {
  title: string
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

  console.log(data)

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
      {data?.tasksByStatus.map(task =>
        <Card key={task.id} task={task} />
      )}
    </List>
  )
}

export default Column

