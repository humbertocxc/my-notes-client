import { Box, Button, Container, Stack } from '@mui/material'
import Column from './Column'
import { useState } from 'react';
import { AddCircle } from '@mui/icons-material';
import CustomModal from './CustomModal';
import { useQuery } from '@apollo/client';
import { allColumnsQuery, IColumnList } from '../typedefs/column/allColumns';


function Board() {
  const { error, loading, data } = useQuery<IColumnList>(allColumnsQuery())

  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error.message)
    return <p>Error fetching data</p>
  }

  return (
    <Container>
      <Stack direction="row" spacing={10}>
        {data?.allColumns.map(column => (
          <Column key={column.id} name={column.name} columnId={column.id} />
        ))}
        <Box>
          <Button sx={{ borderRadius: '100%', p: 2 }} onClick={handleOpenModal}>
            <AddCircle fontSize='large' />
          </Button>
        </Box>
        <CustomModal handleClose={handleCloseModal} open={openModal} >
          <p>teste</p>
        </CustomModal>
      </Stack>
    </Container>
  )
}

export default Board

