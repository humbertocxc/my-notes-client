import { useMutation } from '@apollo/client';
import { IMoveTask, MovedTask, moveTaskMutation } from '../typedefs/task/moveTask';
import { columnDetailsQuery } from '../typedefs/column/columnDetails';

export const useMoveTask = () => {
  const [moveTask] = useMutation<MovedTask>(
    moveTaskMutation,
    {
      refetchQueries: [columnDetailsQuery],
    }
  );

  const handleMoveTask = async (moveData: IMoveTask) => {
    await moveTask({ variables: moveData });
  };

  return handleMoveTask;
};