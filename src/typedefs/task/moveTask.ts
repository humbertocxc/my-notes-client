import { gql } from "@apollo/client";

export interface IMoveTask {
  id: string;
  destinationId: string;
  position: number;
}

export const moveTaskMutation = gql`
  mutation MoveTask($id: String!, $destinationId: String!, $position: Int!) {
    updateTaskPosition(data: { id: $id, destinationId: $destinationId, position: $position }) {
      id
      title
      position
      columnId
    }
  }
`;

export interface MovedTask {
  id: string;
  title: string;
  position: number;
  columnId: string;
}

