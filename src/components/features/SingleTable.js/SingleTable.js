import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { getTableById } from '../../../Redux/tablesRedux';
import TableForm from '../TableForm/TableForm';

const SingleTable = () => {
  const { id } = useParams();
  const tableData = useSelector((state) => getTableById(state, id));

  if (!tableData) return <Navigate to="/" />;
  return (
    <TableForm
      name={tableData.name}
      status={tableData.status}
      peopleAmount={tableData.peopleAmount}
      maxPeopleAmount={tableData.maxPeopleAmount}
      bill={tableData.bill}
    />
  );
};

export default SingleTable;
