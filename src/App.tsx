import Container from '@mui/material/Container';
import Header from './components/Header'
import Board from './components/Board/Board';


export default function App() {
  return (
    <Container sx={{ w: '100vw' }}>
      <Header />
      <Board /> 
    </Container>
  );
}
