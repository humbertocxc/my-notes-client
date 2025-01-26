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

  const handleMoveTask = (moveData: IMoveTask) => {
    moveTask({ variables: moveData });
  };

  return handleMoveTask;
};