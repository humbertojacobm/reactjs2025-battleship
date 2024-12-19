import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

const propTypes = {
  restartGame: PropTypes.func.isRequired,
};

const ActionSection = ({ restartGame }) => {
  return (
    <>
      <Row className="ActionSection mb-3">
        <Col>
          <Button
            onClick={restartGame}
            variant="danger"
            size="lg"
            className="ml-3"
          >
            Restart Game
          </Button>
        </Col>
      </Row>
    </>
  );
};

ActionSection.propTypes = propTypes;

export { ActionSection };
