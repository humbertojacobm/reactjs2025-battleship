class OceanBlock {
  constructor(
    index,
    rowName,
    columNumber,
    isShip,
    isActiveShip,
    shipKey,
    isAttacked
  ) {
    this.index = index;
    this.rowName = rowName;
    this.columNumber = columNumber || 0;
    this.isShip = isShip || false;
    this.isActiveShip = isActiveShip || false;
    this.shipKey = shipKey || "0000";
    this.isAttacked = isAttacked || false;
  }

  Display() {
    return `${this.rowName}${this.columNumber.toString()}`;
  }
}
export default OceanBlock;

export const abcArray = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

export const range = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((_, idx) => start + idx);
};

export const diffBetweenArray = (baseArray, removeArray) =>
  baseArray.filter((item) => !removeArray.some((fItem) => fItem === item));

export const IterateShipContainers = (Containers, BlockUniverse) => {
  for (let index = 0; index < Containers.length; index++) {
    const container = Containers[index];
    IterateShips(container, BlockUniverse, index);
  }
};

export const IterateShips = (Ships, BlockUniverse, SuperName) => {
  for (let index = 0; index < Ships.length; index++) {
    const Ship = Ships[index];
    setShipProperties(Ship, BlockUniverse, SuperName, index);
  }
};

export const setShipProperties = (
  shipBlocks,
  BlockUniverse,
  SuperName,
  SubName
) => {
  for (let index = 0; index < shipBlocks.length; index++) {
    const blockIndex = shipBlocks[index];
    BlockUniverse[blockIndex].isShip = true;
    BlockUniverse[blockIndex].isActiveShip = true;
    BlockUniverse[
      blockIndex
    ].shipKey = `${SuperName.toString()}S00${SubName.toString()}`;
  }
};

export const GetShipByTailSize = (initialBlocks, tailSize) => {
  var result = [];
  var shipSearchingDefaultResult = false;

  while (!shipSearchingDefaultResult) {
    var spaceStartIndex = Math.floor(Math.random() * 100);
    var ShipApplicant = range(spaceStartIndex, spaceStartIndex + tailSize);
    var validationDefaultResult = true;
    var shipSize = ShipApplicant.length;
    var validationStep = 0;

    while (validationDefaultResult && shipSize > validationStep) {
      if (
        !initialBlocks.some((block) => block === ShipApplicant[validationStep])
      ) {
        validationDefaultResult = false;
      }

      var currentStepValue = ShipApplicant[validationStep];

      if (tailSize > 0) {
        if (tailSize > 1) {
          if (0 < validationStep && validationStep < shipSize) {
            if (currentStepValue % 10 === 0 || currentStepValue % 10 === 9) {
              validationDefaultResult = false;
            }
          }
        } else {
          if (validationStep == 0 && currentStepValue % 10 === 9) {
            validationDefaultResult = false;
          }
        }
      }

      validationStep++;
    }

    if (validationDefaultResult) {
      result.push(...ShipApplicant);
      shipSearchingDefaultResult = true;
    }
  }
  return result;
};

export const generateGroupOfShips = (count, baseNumbers, size) => {
  let step = 0;
  let groupResult = [];
  let currentBaseNumbers = Array.from(baseNumbers);
  while (step < count) {
    groupResult.push(GetShipByTailSize(currentBaseNumbers, size));
    currentBaseNumbers = Array.from(
      diffBetweenArray(currentBaseNumbers, groupResult[step])
    );
    step++;
  }
  return { groupResult, currentBaseNumbers };
};

export const generateShipContainers = (BlockUniverse) => {
  let groupResult = [];
  let shipSize = 3;
  let result = {
    groupResult: [],
    currentBaseNumbers: Array.from(BlockUniverse),
  };

  for (let shipAmount = 1; shipAmount <= 4; shipAmount++) {
    result = Object.create(
      generateGroupOfShips(shipAmount, result.currentBaseNumbers, shipSize)
    );
    groupResult.push(Array.from(result.groupResult));
    shipSize--;
  }
  return groupResult;
};

export const getRowNameOrderNumber = (base, letterBase, number, block) => {
  const init = base * 10;
  if (init <= number && number <= init + 9) {
    block.rowName = letterBase;
    block.columNumber = number + 1 - base * 10;
  }
  block.index = number;
};

export const findDestroyShip = (blockUniverse, currentBlock) => {
  for (let index = 0; index < blockUniverse.length; index++) {
    const block = blockUniverse[index];
    if (block.shipKey === currentBlock.shipKey) {
      block.isAttacked = true;
      block.isActiveShip = false;
    }
  }
};
