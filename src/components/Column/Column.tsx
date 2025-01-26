import { Button } from "@mui/material"
import { AddCircle } from "@mui/icons-material";
import { Droppable } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "@apollo/client";
import Card from "../Card/Card"
import { columnDetailsQuery, IColumnDetails } from "../../typedefs/column/columnDetails";
import { createTaskMutation, ICreateTask } from "../../typedefs/task/createTask";
import ColumnStyle from "./ColumnStyle";
import ColumnSkeleton from "./ColumnSkeleton";
import ColumnError from "./ColumnError";


interface ColumnProps {
  name: string
  id: string
  size: number
}


function Column({ name, id, size }: ColumnProps) {
  const { data, refetch, error, loading } = useQuery<IColumnDetails>(columnDetailsQuery, { variables: { id } })
  const [createTask] = useMutation<ICreateTask>(createTaskMutation)

  if (loading) return <ColumnSkeleton size={size} name={name} />;
  if (error) return <ColumnError error={error} name={name} />

  const handleCreateTask = async () => {
    await createTask({ variables: { title: 'teste', columnId: id } })
    refetch()
  }

  const handleRefetch = () => refetch()

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <ColumnStyle
          name={name}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data?.columnById.tasks.map(task =>
            <Card key={task.id} {...task} status={task.status} refetch={handleRefetch} />
          )}
          {provided.placeholder}
          <Button onClick={handleCreateTask}>
            <AddCircle />
          </Button>
        </ColumnStyle>
      )}
    </Droppable>
  )
}

export default Column

