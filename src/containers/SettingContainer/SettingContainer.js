import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const SettingContainer = () => {
  const [numberOfAttempts, setNumberOfAttempts] = useState();
  const [showShips, setShowShips] = useState(false);
  const [validated, setValidated] = useState(false);

  let history = useNavigate();
  const goToGame = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      history(`/game/${numberOfAttempts}/${showShips ? 1 : 0}`);
    }
  };

  const numberChange = (event) => {
    setNumberOfAttempts(event.target.value);
  };

  const showShipsHook = () => setShowShips(!showShips);

  return (
    <>
      <Row>
        <Col className="mt-3">
          <p className="font-weight-bold setting-title">
            Configure BattleShip Game
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form noValidate validated={validated} onSubmit={goToGame}>
            <Form.Group>
              <Form.Label>Level</Form.Label>
              <Form.Control
                as="select"
                value={numberOfAttempts}
                aria-label="Default select example"
                onChange={numberChange}
                required
                size="lg"
              >
                <option value="">Level</option>
                <option value="0">Easy</option>
                <option value="100">Medium</option>
                <option value="50">Hard</option>
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                Please provide a valid level.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                label="Show ships"
                checked={showShips}
                onChange={showShipsHook}
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" className="w-100">
              Enter
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SettingContainer;
