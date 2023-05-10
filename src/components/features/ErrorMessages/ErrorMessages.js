import PropTypes from 'prop-types';

export const errorMessages = {
  required: 'This field is required',
  selectStatus: 'Please select an option',
  peopleStatus: (status) => `If status is "${status}", people must be 0`,
  minLength: (minLength) => `Must be at least ${minLength} characters long`,
  min: (min) => `Must be at least ${min}`,
  max: (max) => `Can't be more than ${max}`,
};

export const Error = ({ children }) => <small className="d-block form-text text-danger mt-2">{children}</small>;

Error.propTypes = {
  children: PropTypes.node.isRequired,
};
