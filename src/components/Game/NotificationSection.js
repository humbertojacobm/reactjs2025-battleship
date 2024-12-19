import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import PropTypes from "prop-types";

const propTypes = {
  isInfinitive: PropTypes.bool.isRequired,
  thereIsActiveShipBlocks: PropTypes.bool.isRequired,
  currentAttempts: PropTypes.number.isRequired,
};

const NotificationSection = ({
  isInfinitive = true,
  thereIsActiveShipBlocks = false,
  currentAttempts = 0,
}) => {
  return (
    <>
      <Row className="NotificationSection mb-3">
        <Col>
          {isInfinitive && (
            <Row className="AttempsTitle">
              <Col>You have infinitive attempts</Col>
            </Row>
          )}
          {!isInfinitive && thereIsActiveShipBlocks && currentAttempts > 0 && (
            <Row className="AttempsTitle">
              <Col>{`You just have ${currentAttempts} attempts`}</Col>
            </Row>
          )}
          <Row>
            <Col>
              {!isInfinitive &&
                thereIsActiveShipBlocks &&
                currentAttempts < 1 && (
                  <Alert variant="danger">
                    <Alert.Heading>You lose the game</Alert.Heading>
                  </Alert>
                )}
              {!thereIsActiveShipBlocks && (
                <Alert variant="success">
                  <Alert.Heading>You won the game</Alert.Heading>
                </Alert>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

NotificationSection.propTypes = propTypes;

export { NotificationSection };
