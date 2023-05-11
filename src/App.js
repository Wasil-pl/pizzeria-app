import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Header from './components/views/Header/Header';
import Footer from './components/views/Footer/Footer';
import Home from './components/pages/Home/Home';
import NoMatch from './components/pages/NoMatch/NoMatch';
import Storage from './components/pages/Storage/Storage';
import SingleTable from './components/features/SingleTable.js/SingleTable';
import { fetchTables } from './Utils/FetchFunction';
import TableAdd from './components/pages/TableAdd/TableAdd';

function App() {
  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchTables('storage')), [dispatch]);
  useEffect(() => dispatch(fetchTables('tables')), [dispatch]);
  useEffect(() => dispatch(fetchTables('status')), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/storage" element={<Storage />} />
        <Route path="/table/add" element={<TableAdd />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
