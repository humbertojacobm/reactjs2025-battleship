import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import SettingContainer from "./containers/SettingContainer/SettingContainer";
import GameContainer from "./containers/GameContainer/GameContainer";
import RecordsContainer from "./containers/RecordsContainer/RecordsContainer";
import { ShipAlert } from "./components";
import { GlobalContextProvider } from "./GlobalContext";
import "./App.css";

function App() {
  return (
    <GlobalContextProvider>
      <Router>
        <Container fluid>
          <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
              <Link to="/" className="nav-link">
                Setting
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link to="/records" className="nav-link">
                Records
              </Link>
            </Nav.Item>
          </Nav>
          <Row>
            <Col>
              <Routes>
                <Route
                  path="/game/:attemptsParam/:showShips"
                  element={<GameContainer />}
                />
                <Route path="/records/" element={<RecordsContainer />} />
                <Route path="/" element={<SettingContainer />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col>
              <ShipAlert />
            </Col>
          </Row>
        </Container>
      </Router>
    </GlobalContextProvider>
  );
}

export default App;
