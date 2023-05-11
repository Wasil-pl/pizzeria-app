import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const DeleteTableModal = ({ show, onClose, onConfirmDeleteTable }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This operation will completely remove this Table from the app</p>
        <p>Are you sure you want to do that?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirmDeleteTable}>
          Delete Table
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeleteTableModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDeleteTable: PropTypes.func.isRequired,
};

export default DeleteTableModal;
