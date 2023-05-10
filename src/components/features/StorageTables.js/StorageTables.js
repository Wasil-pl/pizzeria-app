import { Col, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import TableThumbnail from '../TableThumbnail/TableThumbnail';
import { getAllTables } from '../../../Redux/storageRedux';

const StorageTables = () => {
  const tables = useSelector(getAllTables);
  console.log('tables:', tables);

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

export default StorageTables;
