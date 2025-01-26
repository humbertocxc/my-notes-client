import { useMutation } from '@apollo/client';
import { IMoveTask, MovedTask, moveTaskMutation } from '../typedefs/task/moveTask';

export const useMoveTask = () => {
  const [moveTask] = useMutation<MovedTask>(moveTaskMutation);

  const handleMoveTask = (moveData: IMoveTask) => {
    moveTask({ variables: moveData });
  };

  return handleMoveTask;
};