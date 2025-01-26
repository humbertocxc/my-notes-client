import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd'
import { Container, Stack } from '@mui/material'
import { useQuery } from '@apollo/client';
import Column from '../Column/Column'
import { allColumnsQuery, IColumnList } from '../../typedefs/column/allColumns';
import { IMoveTask } from '../../typedefs/task/moveTask';
import { useMoveTask } from '../../hooks/useMoveTask';
import { boardStyle } from './styles';
import { useState } from 'react';
import { Loading } from './Loading';


function Board() {
  const { error, loading, data } = useQuery<IColumnList>(allColumnsQuery)
  const [ movingTask, setMovingTask ] = useState(false)
  const moveTask = useMoveTask()

  if (loading) return <Loading loading />;

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

    setMovingTask(true)
    await moveTask(moveData)
    setMovingTask(false)
  }

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <Stack direction="row" spacing={3} sx={boardStyle} >
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
      <Loading loading={movingTask} />
    </Container>
  )
}

export default Board
