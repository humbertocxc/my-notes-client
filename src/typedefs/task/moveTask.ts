import { gql } from "@apollo/client";

export interface IMoveTask {
  id: string;
  destinationId: string;
  position: number;
}

export const moveTaskMutation = gql`
  mutation MoveTask($id: String!, $destinationId: String!, $position: Int!) {
    updateTaskPosition(data: { id: $id, destinationId: $destinationId, position: $position }) {
      originId
      destinationId
    }
  }
`;

export interface MovedTask {
  updateTaskPosition?: {
    originId?: string
    destinationId?: string
  }
}
