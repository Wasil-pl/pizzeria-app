import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../Redux/tablesRedux';
import TableThumbnail from '../TableThumbnail/TableThumbnail';

const Tables = () => {
  const tables = useSelector(getAllTables);

  return (
    <Container>
      <Col>
        {tables.map((table) => (
          <div key={table.id} to={'/table/' + table.id}>
            <TableThumbnail
              name={table.name}
              status={table.status}
              peopleAmount={table.peopleAmount}
              maxPeopleAmount={table.maxPeopleAmount}
              bill={table.bill}
              id={table.id}
            />
          </div>
        ))}
      </Col>
    </Container>
  );
};

export default Tables;
