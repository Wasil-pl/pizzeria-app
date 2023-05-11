import { useEffect, useState } from 'react';
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
  const [pending, setPending] = useState(false);
  console.log('pending:', pending);

  useEffect(() => dispatch(fetchTables('storage', setPending)), [dispatch]);
  useEffect(() => dispatch(fetchTables('tables', setPending)), [dispatch]);
  useEffect(() => dispatch(fetchTables('status', setPending)), [dispatch]);

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home pending={pending} />} />
        <Route path="/storage" element={<Storage pending={pending} />} />
        <Route path="/table/add" element={<TableAdd />} />
        <Route path="/table/:id" element={<SingleTable />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
      <Footer />
    </Container>
  );
}

export default App;
