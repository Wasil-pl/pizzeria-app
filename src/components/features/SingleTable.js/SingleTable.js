import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import { getTableById, updateRequest } from '../../../Redux/tablesRedux';
import TableForm from '../TableForm/TableForm';

const SingleTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tableData = useSelector((state) => getTableById(state, id));

  const handleSubmit = (table) => {
    dispatch(updateRequest({ ...table, id }));
    navigate('/');
  };

  if (!tableData) return <Navigate to="/" />;
  return (
    <TableForm
      name={tableData.name}
      action={handleSubmit}
      status={tableData.status}
      peopleAmount={tableData.peopleAmount}
      maxPeopleAmount={tableData.maxPeopleAmount}
      bill={tableData.bill}
    />
  );
};

export default SingleTable;
