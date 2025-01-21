import { Container, Stack } from '@mui/material'
import Column from './Column'
import useColumnQueries from '../hooks/useColumnQueries';


function Board() {
  const { loading, error, data } = useColumnQueries()

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  return (
    <Container>
      <Stack direction="row" spacing={10}>
        {data?.allColumns.map(column => (
          <Column key={column.id} name={column.name} id={column.id} />
        ))}
      </Stack>
    </Container>
  )
}

export default Board

