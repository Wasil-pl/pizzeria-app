import { Container } from 'react-bootstrap';
import Tables from '../../features/Tables/Tables';

const Home = () => {
  return (
    <div>
      <Container className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-4">All Tables</h2>
      </Container>
      <Tables />
    </div>
  );
};

export default Home;
