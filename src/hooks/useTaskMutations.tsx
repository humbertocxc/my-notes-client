import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Status } from '../../lib/types';


interface IUseTaskMutations {
  id?: string
  status?: Status
  refetch: () => void
  columnId?: string
}

const useTaskMutations = ({ id, status, refetch, columnId }: IUseTaskMutations) => {

  const newStatus = status === 'done' ? 'todo' : 'done'

  const UPDATE_TASK_STATUS = gql`
    mutation {
      updateTaskStatus(id: "${id}", status: "${newStatus}") {
        id
        status
      }
    }
  `;

  const DELETE_TASK = gql`
    mutation {
      deleteTask(id: "${id}") {
        id
      }
    }
  `;

  const CREATE_TASK = gql`
    mutation {
      createTask(data: { title: "test create", description: "test", columnId: "${columnId}" }) {
        id
        title
        description
      }
    }
  `

  const [createTask ] = useMutation(CREATE_TASK)
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);
  const [deleteTask] = useMutation(DELETE_TASK);

  const createNewTask = async () => {
    await createTask()
    refetch()
  }

  const changeStatus = async () => {
    await updateTaskStatus();
    refetch();
  };

  const deleteTaskById = async () => {
    await deleteTask();
    refetch();
  };

  return {
    changeStatus,
    deleteTaskById,
    createNewTask,
  };
};

export default useTaskMutations;
