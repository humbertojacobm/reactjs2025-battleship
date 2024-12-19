import React, { useContext, useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { GlobalContext } from "../../GlobalContext";

const RecordsContainer = () => {
  const [games, setGames] = useState([]);
  const { globalState } = useContext(GlobalContext);
  useEffect(() => {
    setGames([...globalState.games.slice(0).reverse()]);
  }, []);
  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Level</th>
                <th>Attemps</th>
                <th>Rest Of Attemps</th>
                <th>Completed Game</th>
              </tr>
            </thead>
            <tbody>
              {games.map((game) => (
                <tr key={game.id}>
                  <td>{game.id}</td>
                  <td>
                    {game.attemps === 0
                      ? "easy"
                      : game.attemps === 100
                      ? "medium"
                      : game.attemps === 50
                      ? "hard"
                      : "Other"}
                  </td>
                  <td>{game.attemps}</td>
                  <td>{game.restOfAttemps}</td>
                  <td>{(!game.thereIsActiveShipBlocks).toString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default RecordsContainer;
