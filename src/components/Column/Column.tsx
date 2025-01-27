import { useState } from "react";
import { Button } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { Droppable } from "@hello-pangea/dnd";
import { useMutation, useQuery } from "@apollo/client";
import Card from "../Card/Card"
import { columnDetailsQuery, IColumnDetails } from "../../typedefs/column/columnDetails";
import { createTaskMutation, ICreateTask } from "../../typedefs/task/createTask";
import ColumnStyle from "./ColumnStyle";
import ColumnSkeleton from "./ColumnSkeleton";
import ColumnError from "./ColumnError";
import CustomModal from "../CustomModal";
import { EditColumnForm } from "./EditColumnForm";
import { addTaskStyle } from "./styles";


interface ColumnProps {
  name?: string
  id: string
  size?: number
}


function Column({ name: startName = '', size: startSize = 0, id }: ColumnProps) {
  const { data, refetch, error, loading } = useQuery<IColumnDetails>(columnDetailsQuery, { variables: { id } })
  const [createTask] = useMutation<ICreateTask>(createTaskMutation)

  const { size } = data?.columnById || { size: startSize }
  const { name } = data?.columnById || { name: startName }

  const [showDetailModal, setShowDetailModal] = useState(false)

  if (loading) return <ColumnSkeleton size={size} name={name} />;
  if (error) return <ColumnError error={error} name={name} />


  const handleCreateTask = async () => {
    await createTask({ variables: { title: 'New task', columnId: id } })
    refetch()
  }

  const handleRefetch = () => refetch()

  const handleOpenModal = () => setShowDetailModal(true)
  const handleCloseModal = () => setShowDetailModal(false)

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <ColumnStyle
          showButton
          onClick={handleOpenModal}
          name={name}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {data?.columnById.tasks.map(task =>
            <Card key={task.id} {...task} status={task.status} refetch={handleRefetch} />
          )}
          {provided.placeholder}
          <Button onClick={handleCreateTask} sx={addTaskStyle}>
            <AddIcon sx={{ fontSize: '2em', mt: 1 }} />
          </Button>
          <CustomModal isOpen={showDetailModal} onClose={handleCloseModal} isSubmit buttonText="Save name">
            <EditColumnForm name={name} id={id} size={size} refetch={handleRefetch} close={handleCloseModal} />
          </CustomModal>
        </ColumnStyle>
      )}
    </Droppable>
  )
}

export default Column

