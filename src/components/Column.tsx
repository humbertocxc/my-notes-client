import { Button, List, ListSubheader, Typography } from "@mui/material"
import { AddCircle } from "@mui/icons-material";
import { Droppable } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "@apollo/client";
import Card from "./Card"
import { columnDetailsQuery, IColumnDetails } from "../typedefs/column/columnDetails";
import { createTaskMutation, ICreateTask } from "../typedefs/task/createTask";

interface ColumnProps {
  name: string
  id: string
}

function Column({ name, id }: ColumnProps) {
  const { data, refetch, error, loading } = useQuery<IColumnDetails>(columnDetailsQuery, { variables: { id } })

  const [createTask] = useMutation<ICreateTask>(createTaskMutation)

  const handleCreateTask = async () => {
    await createTask({ variables: { title: 'teste', columnId: id } })
    refetch()
  }

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  const handleRefetch = () => refetch()

  return (
    <Droppable droppableId={id}>
      {(provided) => (
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
              <Button onClick={handleCreateTask}>
                <AddCircle sx={{ color: 'primary' }} />
              </Button>
            </ListSubheader>
          }
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data?.columnById.tasks.map(task =>
            <Card key={task.id} {...task} status={task.status} refetch={handleRefetch} />
          )}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  )
}

export default Column

