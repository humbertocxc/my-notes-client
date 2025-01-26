import { useMutation } from '@apollo/client';
import { IMoveTask, MovedTask, moveTaskMutation } from '../typedefs/task/moveTask';
import { columnDetailsQuery } from '../typedefs/column/columnDetails';

export const useMoveTask = () => {
  const [moveTask] = useMutation<MovedTask>(
    moveTaskMutation,
    {
      refetchQueries: ({ data }) => {
        if (!data || !data.updateTaskPosition) return [];

        const { destinationId, originId } = data.updateTaskPosition;
        const refetches = []

        if (destinationId) {
          refetches.push({ query: columnDetailsQuery, variables: { id: destinationId } })
        }
        if (originId) {
          refetches.push({ query: columnDetailsQuery, variables: { id: originId } })
        }

        return refetches
      },
    }
  );

  const handleMoveTask = async (moveData: IMoveTask, handleError: VoidFunction) => {
    await moveTask({ variables: moveData, onError: handleError });
  };

  return handleMoveTask;
};