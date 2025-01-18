import { Container, Stack } from '@mui/material'
import { columns } from '../../utils/todo'
import Column from './Column'


function Board() {
  return (
    <Container>
      <Stack direction="row" spacing={10}>
        {columns.map(column => (
          <Column key={column.id} {...column} />
        ))}
      </Stack>
    </Container>
  )
}

export default Board

