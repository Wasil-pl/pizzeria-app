import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllStatus } from '../../../Redux/statusRedux';
import PropTypes from 'prop-types';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Error, errorMessages } from '../ErrorMessages/ErrorMessages';

const TableForm = ({ action, actionText, ...props }) => {
  const [name, setName] = useState(props.name || '');
  const [status, setStatus] = useState(props.status || '');
  const [peopleAmount, setPeopleAmount] = useState(props.peopleAmount || '0');
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(props.maxPeopleAmount || '0');
  const [bill, setBill] = useState(props.bill || '');
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  const statusData = useSelector(getAllStatus);

  const handleSubmit = () => {
    action({ name, status, peopleAmount, maxPeopleAmount, bill });
  };

  const handleStatusChange = (status) => {
    if (status === 'Free' || status === 'Cleaning') {
      setPeopleAmount(0);
      setBill(0);
    }
  };

  const handleMaxPeopleAmountChange = (value) => {
    if (peopleAmount > value) {
      setPeopleAmount(value);
    }
  };

  return (
    <Form onSubmit={validate(handleSubmit)}>
      {actionText === 'Add Table' && (
        <Form.Group controlId="title" as={Row} className="mb-3">
          <Form.Label column sm={1}>
            Name:
          </Form.Label>
          <Col sm={4}>
            <Form.Control
              {...register('title', {
                required: errorMessages.required,
                minLength: { value: 3, message: errorMessages.minLength(3) },
              })}
              type="text"
              placeholder="Enter title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          {errors.title && <Error>{errors.title.message}</Error>}
        </Form.Group>
      )}

      <Form.Group controlId="status" as={Row} className="mb-3">
        <Form.Label column sm={1}>
          Status:
        </Form.Label>
        <Col sm={4}>
          <Form.Select
            {...register('status', {
              required: errorMessages.selectStatus,
              validate: (value) => value !== 'Choose Option' || errorMessages.selectStatus,
            })}
            onChange={(e) => {
              setStatus(e.target.value);
              handleStatusChange(e.target.value);
            }}
            value={status}
          >
            <option>Choose Option</option>
            {statusData.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </Form.Select>
          {errors.status && <Error>{errors.status.message}</Error>}
        </Col>
      </Form.Group>

      <Form.Group controlId="people" as={Row} className="mb-3">
        <Form.Label column sm={1}>
          People:
        </Form.Label>
        <Col sm={2}>
          <InputGroup>
            <Form.Control
              {...register('people', {
                required: errorMessages.required,
                min: { value: 0, message: errorMessages.min(0) },
                max: { value: maxPeopleAmount, message: errorMessages.max(maxPeopleAmount) },
                validate: (value, { status }) => {
                  if (status === 'Free' || status === 'Cleaning') {
                    if (parseInt(value) !== 0) {
                      return errorMessages.peopleStatus(status);
                    }
                  }
                },
              })}
              type="number"
              value={peopleAmount}
              onChange={(e) => setPeopleAmount(parseInt(e.target.value))}
            />
            <InputGroup.Text>/</InputGroup.Text>
            <Form.Control
              {...register('maxPeople', {
                required: errorMessages.required,
                min: { value: 0, message: errorMessages.min(0) },
                max: { value: 10, message: errorMessages.max(10) },
              })}
              type="number"
              value={maxPeopleAmount}
              onChange={(e) => {
                setMaxPeopleAmount(parseInt(e.target.value));
                handleMaxPeopleAmountChange(parseInt(e.target.value));
              }}
            />
          </InputGroup>
          {errors.people && <Error>{errors.people.message}</Error>}
          {errors.maxPeople && <Error>{errors.maxPeople.message}</Error>}
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
              <Form.Control
                {...register('bill', {
                  required: errorMessages.required,
                  min: { value: 0, message: errorMessages.min(0) },
                })}
                type="number"
                value={bill}
                onChange={(e) => setBill(parseInt(e.target.value))}
              />
            </InputGroup>
            {errors.bill && <Error>{errors.bill.message}</Error>}
          </Col>
        </Form.Group>
      )}

      <Button variant="primary" type="submit">
        {actionText}
      </Button>
    </Form>
  );
};

TableForm.propTypes = {
  action: PropTypes.func.isRequired,
  actionText: PropTypes.string.isRequired,
  name: PropTypes.string,
  status: PropTypes.string,
  peopleAmount: PropTypes.number,
  maxPeopleAmount: PropTypes.number,
  bill: PropTypes.number,
};

export default TableForm;
