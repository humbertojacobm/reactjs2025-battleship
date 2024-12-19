import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { alertService } from "../../services";
import OceanBlock, {
  abcArray,
  generateShipContainers,
  IterateShipContainers,
  getRowNameOrderNumber,
  findDestroyShip,
} from "../../Utils/Common";
import {
  OceonShipBlock,
  NotificationSection,
  ActionSection,
  ShipConfirmation,
} from "../../components";
import { GlobalContext } from "../../GlobalContext";
import "./GameContainer.css";

const GameContainer = () => {
  const [oceanBlocks, setOceanBlocks] = useState(new Array(100));
  const [isInfinitive, setIsInfinitive] = useState(true);
  const [currentAttempts, setCurrentAttempts] = useState(0);
  const [thereIsActiveShipBlocks, setThereIsActiveShipBlocks] = useState(true);
  const [displayShips, setDisplayShips] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalBody, setModalBody] = useState("");
  const [gameId, setGameId] = useState(0);
  const { loadGames, globalState } = useContext(GlobalContext);
  const { attemptsParam, showShips } = useParams();
  const attempts = +attemptsParam;
  const alertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
  };

  const addNewGame = (currentAttempts) => {
    let globalGames = [...globalState.games];
    const currentId = globalGames.length + 1;
    setGameId(currentId);
    const currentGame = {
      id: currentId,
      attemps: attempts,
      restOfAttemps: currentAttempts,
      thereIsActiveShipBlocks: true,
    };
    globalGames.push(currentGame);
    loadGames([...globalGames]);
  };

  const load = () => {
    setThereIsActiveShipBlocks(true);
    if (parseInt(attempts) === 0) {
      setIsInfinitive(true);
    } else {
      setIsInfinitive(false);
      setCurrentAttempts(attempts);
    }
    setDisplayShips(showShips > 0);
    addNewGame(parseInt(attempts));

    const groupResult = generateShipContainers(Array.from(Array(100).keys()));

    var initialOceanBlocks = Array.from(Array(100).keys()).map((number) => {
      let block = new OceanBlock();

      abcArray.forEach((letter, letterIndex) => {
        getRowNameOrderNumber(letterIndex, letter, number, block);
      });

      return block;
    });

    IterateShipContainers(groupResult, initialOceanBlocks);

    setOceanBlocks(initialOceanBlocks);
  };

  useEffect(() => {
    load();
  }, []);

  const updateCurrentGame = (currentAttempts, thereIsActiveShipBlocks) => {
    let globalGames = [...globalState.games];
    let currentGame = globalGames[gameId - 1];
    currentGame.restOfAttemps = currentAttempts;
    currentGame.thereIsActiveShipBlocks = thereIsActiveShipBlocks;
    loadGames([...globalGames]);
  };

  const fire = (index) => {
    if (!isInfinitive && currentAttempts === 0) {
      const loseMessage =
        "You do not have more shots!!. Would you like to restart the game?";
      alertService.error(loseMessage, alertOptions);
      setModalBody(loseMessage);
      handleShowModal();
      return false;
    }

    let newOceanBlocks = Array.from(oceanBlocks);
    let currentBlock = newOceanBlocks[index];
    let stepAttempts = currentAttempts;

    if (!currentBlock.isAttacked) {
      if (currentBlock.isShip) {
        findDestroyShip(newOceanBlocks, currentBlock);
        alertService.info("ship destroyed!!", alertOptions);
      } else {
        currentBlock.isAttacked = true;
        alertService.warn("you failed the shot!!", alertOptions);
      }
      if (!isInfinitive) {
        stepAttempts = currentAttempts - 1;
        setCurrentAttempts(stepAttempts);
      }
    } else {
      alertService.warn("This area was atacked!!", alertOptions);
    }

    const currentThereIsActiveShips = newOceanBlocks.some(
      (block) => block.isActiveShip
    );
    setThereIsActiveShipBlocks(currentThereIsActiveShips);

    if (!currentThereIsActiveShips) {
      const winMessage =
        "you won the game!!. Would you like to restart the game?";
      alertService.success(winMessage, alertOptions);
      setModalBody(winMessage);
      handleShowModal();
    }

    setOceanBlocks(newOceanBlocks);

    updateCurrentGame(stepAttempts, currentThereIsActiveShips);
  };

  const restartGame = () => {
    load();
  };

  const handleShowModal = () => setShowModal(true);
  const handleAcceptModal = () => {
    setShowModal(false);
    restartGame();
  };
  const handleShowModalFalse = () => setShowModal(false);
  return (
    <>
      <Row>
        <ShipConfirmation
          show={showModal}
          body={modalBody}
          title="Finished Game"
          onCancel={handleShowModalFalse}
          onAccept={handleAcceptModal}
        />
      </Row>
      <Row className="GameContainer mt-4">
        <Col>
          <ActionSection restartGame={restartGame} />
          <NotificationSection
            isInfinitive={isInfinitive}
            thereIsActiveShipBlocks={thereIsActiveShipBlocks}
            currentAttempts={currentAttempts}
          />
          <Card style={{ padding: "1rem" }}>
            <div className="ocean-container">
              {oceanBlocks.map((block) => (
                <OceonShipBlock
                  key={block.index}
                  {...block}
                  fire={fire}
                  displayShips={displayShips}
                  display={block.Display()}
                />
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default GameContainer;
