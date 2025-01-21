import { Button, List, ListSubheader, Typography } from "@mui/material"
import Card, { Status } from "./Card"
import { gql, useMutation, useQuery } from "@apollo/client";
import { AddCircle } from "@mui/icons-material";

interface ColumnProps {
  name: string
  id: string
}

interface TaskListItem {
  id: string
  title: string
  status: Status
}

interface TaskColumnList {
  tasksByColumn: TaskListItem[]
}

function Column({ name, id }: ColumnProps) {
  const GET_TASKS = gql`
    query {
      tasksByColumn(columnUniqueInput: { id: "${id}"}) {
        id
        status
        title
      }
    }
  `;

  const CREATE_TASK = gql`
    mutation {
      createTask(data: { title: "test create", description: "test", columnId: "${id}" }) {
        id
        title
        description
      }
    }
  `

  const { loading, error, data, refetch } = useQuery<TaskColumnList>(GET_TASKS);
  const [createTask ] = useMutation(CREATE_TASK)

  const createNewTask = async () => {
    await createTask()
    refetch()
  }

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
      {data?.tasksByColumn.map(task =>
        <Card key={task.id} {...task} status={task.status} refetch={handleRefetch} />
      )}
    </List>
  )
}

export default Column

