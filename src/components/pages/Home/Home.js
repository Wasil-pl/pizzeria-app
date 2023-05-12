import Tables from '../../features/Tables/Tables';
import Loader from '../../views/Loader/Loader';
import ErrorLoad from '../../views/ErrorLoad/ErrorLoad';
import { useSelector } from 'react-redux';
import { selectAreTablesLoading, selectTablesError } from '../../../Redux/tablesRedux';

const Home = () => {
  const isLoading = useSelector(selectAreTablesLoading);
  const error = useSelector(selectTablesError);
  console.log('error:', error);

  return (
    <div>
      {error && <ErrorLoad />}
      {isLoading && <Loader />}
      {!isLoading && <Tables />}
    </div>
  );
};

export default Home;
