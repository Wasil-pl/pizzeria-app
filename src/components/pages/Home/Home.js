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

export default Home;
