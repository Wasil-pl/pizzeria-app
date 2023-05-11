import { Container } from 'react-bootstrap';
import AddTableForm from '../../features/AddTableForm/AddTableForm';
import styles from './TableAdd.module.scss';

const TableAdd = () => {
  return (
    <div className={styles.container}>
      <Container>
        <h2 className={styles.title}>Add Table</h2>
      </Container>
      <AddTableForm />
    </div>
  );
};

export default TableAdd;
