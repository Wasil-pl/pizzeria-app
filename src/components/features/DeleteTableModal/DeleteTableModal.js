import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap';

const DeletePostModal = ({ show, onClose, onConfirmDeletePost }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>This operation will completely remove this post from the app</p>
        <p>Are you sure you want to do that?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirmDeletePost}>
          Delete Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

DeletePostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirmDeletePost: PropTypes.func.isRequired,
};

export default DeletePostModal;
