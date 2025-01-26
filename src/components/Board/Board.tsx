import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd'
import { Container, Stack } from '@mui/material'
import { useQuery } from '@apollo/client';
import Column from '../Column/Column'
import { allColumnsQuery, IColumnList } from '../../typedefs/column/allColumns';
import { IMoveTask } from '../../typedefs/task/moveTask';
import { useMoveTask } from '../../hooks/useMoveTask';


function Board() {
  const { error, loading, data } = useQuery<IColumnList>(allColumnsQuery)
  const moveTask = useMoveTask()

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  const onDragEnd: OnDragEndResponder = async (result) => {
    const moveData: IMoveTask = {
      id: result.draggableId,
      destinationId: result.destination?.droppableId!,
      position: result.destination?.index!
    }

    await moveTask(moveData)
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack direction="row" spacing={10}>
          {data?.allColumns.map(column => (
            <Column
              key={column.id}
              name={column.name}
              size={column.size}
              id={column.id}
            />
          ))}
        </Stack>
      </DragDropContext>
    </Container>
  )
}

export default Board

