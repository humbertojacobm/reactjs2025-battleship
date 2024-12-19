import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onAccept: PropTypes.func.isRequired,
};

const ShipConfirmation = (props) => {
  const { show, body, title, onCancel, onAccept } = props;
  return (
    <Modal show={show} onHide={onCancel}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ShipConfirmation.propTypes = propTypes;

export { ShipConfirmation };
