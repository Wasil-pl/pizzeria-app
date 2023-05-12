import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TableThumbnail from '../TableThumbnail/TableThumbnail';
import { getActiveTables } from '../../../Redux/tablesRedux';

const Tables = () => {
  const tables = useSelector(getActiveTables);

  return (
    <Container>
      <h2 className="mb-4">All Tables</h2>
      <Col>
        {tables.map((table) => (
          <div key={table.id} to={'/table/' + table.id}>
            <TableThumbnail name={table.name} status={table.status} bill={table.bill} id={table.id} />
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default Tables;
