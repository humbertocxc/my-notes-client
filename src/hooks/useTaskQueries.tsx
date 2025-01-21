import { gql, useQuery } from "@apollo/client";
import { Status } from '../../lib/types';


interface TaskListItem {
  id: string
  title: string
  status: Status
}

interface TaskColumnList {
  tasksByColumn: TaskListItem[]
}

interface IUseTaskQueries {
  columnId?: string
  id?: string
}

const useTaskQueries = ({ columnId, id }: IUseTaskQueries) => {
  const GET_TASKS = gql`
    query {
      tasksByColumn(columnUniqueInput: { id: "${columnId}"}) {
        id
        status
        title
      }
    }
  `;

  const TASK_BY_ID_ITEM = gql`
    query {
      taskById (id: "${id}") {
        id
        status
        title
      }
    }
  `

  const { loading, error, data: taskList, refetch } = useQuery<TaskColumnList>(GET_TASKS);
  const { data: taskListItem, refetch: refetchTask } = useQuery<TaskColumnList>(TASK_BY_ID_ITEM);

  return {
    taskList,
    loading,
    error,
    refetch,
    taskListItem,
    refetchTask
  }
}

export default useTaskQueries
