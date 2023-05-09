import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchTables } from './Redux/tablesRedux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import NoMatch from './components/pages/NoMatch/NoMatch';
import { fetchStorage } from './Redux/storageRedux';
import Storage from './components/pages/Storage/Storage';
import SingleTable from './components/features/SingleTable.js/SingleTable';
import { fetchStatus } from './Redux/statusRedux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchStorage()), [dispatch]);
  useEffect(() => dispatch(fetchTables()), [dispatch]);
  useEffect(() => dispatch(fetchStatus()), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
