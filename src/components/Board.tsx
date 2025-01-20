import { Container, Stack } from '@mui/material'
import Column from './Column'
import { gql, useQuery } from '@apollo/client';

interface IColumn {
  allTaskStatuses: { name: string }[]
}

const GET_COLUMNS = gql`
  query {
    allTaskStatuses {
      name
    }
  }
`;

function Board() {
  const { loading, error, data } = useQuery<IColumn>(GET_COLUMNS);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  return (
    <Container>
      <Stack direction="row" spacing={10}>
        {data?.allTaskStatuses.map(status => (
          <Column key={status.name} title={status.name} />
        ))}
      </Stack>
    </Container>
  )
}

export default Board

