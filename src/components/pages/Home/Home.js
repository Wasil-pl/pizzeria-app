import PropTypes from 'prop-types';
import Tables from '../../features/Tables/Tables';
import Loader from '../../views/Loader/Loader';

const Home = ({ pending }) => {
  return (
    <div>
      {pending && <Loader />}
      {!pending && <Tables />}
    </div>
  );
};

Home.propTypes = {
  pending: PropTypes.bool.isRequired,
};

export default Home;
