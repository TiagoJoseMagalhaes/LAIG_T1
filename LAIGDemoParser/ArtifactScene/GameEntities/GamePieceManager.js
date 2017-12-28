function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 *
 * @param {*} Scene
 * @param {*} pieceNodeID
 */
function GamePieceManager(Scene, pieceNodeID) {
  this.Scene = Scene;
  this.nodeID = pieceNodeID;
  this.graph = this.Scene.graph;

  this.board = null;
  if (this.Scene.board != null) {
    this.board = this.Scene.board;
  }

  this.pieces = [];
  this.pieceMap = new Map();

  if (this.board != null) {
    this.setUp();
  }
};

/**
 *
 */
GamePieceManager.prototype.setUp = function() {
  if (this.board != null) {
    this.nCell = this.board.nCells;
    this.sCell = this.board.sCell;
    this.startX = this.board.startX;
    this.startY = this.board.startY;
    this.startZ = this.board.startZ;

    for (let i = 0; i < this.nCell; ++i) {
      for (let j = i; j < this.nCell; ++j) {
        // add the upper values
        let x = i * this.sCell + this.sCell / 2;
        let z = j * this.sCell + this.sCell / 2;

        let piece1 = new GamePiece(
            this.Scene, this.generateRandomColor(),
            {x: x, y: this.startY, z: z});
        this.pieceMap[{i, j}] = piece1;
        this.pieces.push(piece1);
        // add the lower values
        let piece2 = new GamePiece(
            this.Scene, this.generateRandomColor(),
            {x: z, y: this.startY, z: x});
        this.pieceMap[{j, i}] = piece2;
        this.pieces.push(piece2);
      }
    }

    return;
  } else {
    console.log('error');
    return 'error';
  }
  console.log('error');
  return 'error';
};

/**
 *
 * @param {*} colors
 */
GamePieceManager.prototype.colorSetUp = function(colors) {
  for (let i = 0; i < colors.length; ++i) {
    for (let j = 0; j < color[i].length; ++i) {
      let color = this.translateNumberToColor(colors[i][j]);
      this.pieceMap[{i, j}].colorSetUp(color);
    }
  }
};

/**
 *
 */
GamePieceManager.prototype.generateRandomColor = function() {
  let rand = getRandomInt(1, 4);
  let col = 'random';
  switch (rand) {
    case (1): {
      return 'green';
      break;
    }
    case (2): {
      return 'red';
      break;
    }
    case (3): {
      return 'blue';
      break;
    }
    case (4): {
      return 'yellow';
      break;
    }
    default:
      break;
  }
};

/**
 * Translates a prolog response number to a color
 * @param {number} num the number to translate
 */
GamePieceManager.prototype.translateNumberToColor = function(num) {
  switch (num) {
    case (1): {
      return 'green';
      break;
    }
    case (2): {
      return 'red';
      break;
    }
    case (3): {
      return 'blue';
      break;
    }
    case (4): {
      return 'yellow';
      break;
    }
    default:
      return null;
      break;
  }
};

/**
 *
 */
GamePieceManager.prototype.display = function() {
  this.graph.nodes[this.nodeID].isPiece = false;
  for (let i = 0; i < this.pieces.length; ++i) {
    if (this.pieces[i].isAlive) {
      this.Scene.pushMatrix();

      let piece = this.pieces[i];
      this.Scene.translate(
          piece.translation.x, piece.translation.y, piece.translation.z);

      this.graph.displayScene(this.nodeID, null, null, null, piece.mat);

      this.Scene.popMatrix();
    }
  }
  this.graph.nodes[this.nodeID].isPiece = true;
};