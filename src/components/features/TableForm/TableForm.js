import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllStatus } from '../../../Redux/statusRedux';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';

const TableForm = ({ action, ...props }) => {
  const [name, setName] = useState(props.name || '');
  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '0');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '');
  const [bill, setBill] = useState(props.bill || '');

  const statusData = useSelector(getAllStatus);

  const handleSubmit = () => {
    action({ name, status, peopleAmount, maxPeopleAmount, bill });
  };

  return (
    <Form onSubmit={handleSubmit}>
      {name ? (
        <h2>{props.name}</h2>
      ) : (
        <Form.Group controlId="title" as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Name:
          </Form.Label>
          <Form.Control type="text" placeholder="Enter title" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
      )}

      <Form.Group controlId="status" as={Row} className="mb-3">
        <Form.Label column sm={1}>
          Status:
        </Form.Label>
        <Col sm={4}>
          <Form.Select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option>Choose Option</option>
            {statusData.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </Form.Select>
        </Col>
      </Form.Group>

      <Form.Group controlId="People" as={Row} className="mb-3">
        <Form.Label column sm={1}>
          People:
        </Form.Label>
        <Col sm={2}>
          <InputGroup>
            <Form.Control type="text" value={peopleAmount} onChange={(e) => setPeopleAmount(e.target.value)} />
            <InputGroup.Text>/</InputGroup.Text>
            <Form.Control type="text" value={maxPeopleAmount} onChange={(e) => setMaxPeopleAmount(e.target.value)} />
          </InputGroup>
        </Col>
      </Form.Group>

      {status === 'Busy' && (
        <Form.Group controlId="bill" as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Bill:
          </Form.Label>
          <Col sm={2}>
            <InputGroup>
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control type="text" value={bill} onChange={(e) => setBill(e.target.value)} />
            </InputGroup>
          </Col>
        </Form.Group>
      )}

      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
};

export default TableForm;
