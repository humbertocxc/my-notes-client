import { gql, useQuery } from "@apollo/client";


interface IColumn {
  allColumns: {
    name: string
    id: string
  }[]
}

const useColumnQueries = () => {
  const GET_COLUMNS = gql`
    query {
      allColumns {
        id
        name
      }
    }
  `;

  const { loading, error, data } = useQuery<IColumn>(GET_COLUMNS);

  return {
    loading,
    error,
    data
  }
}

export default useColumnQueries
