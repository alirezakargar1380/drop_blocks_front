class SceneChessBoard extends Phaser.Scene {
  constructor() {
    super();
    this.shapes = {
      "L": "L"
    }
    this.newStartPoint = {
      x: 1, y: 1
    }
  }

  preload() { }

  create() {
    console.log(this.getCubePoints(2, 2))
    // CURRETLY IN topLeft
    this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "topRight")
    this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "downRight")
  }

  getShapePoints(shapeName, stepByRotation, lastStartPoint, r) {
    let newStartPoint
    let shapePoint = [];
    let counter = 0;
    let maxCupe = 4;
    let result
    switch (shapeName) {
      case "L":
        // this.findDirection()

        // check for direction want to go
        if (this.canGoHere({
          x: lastStartPoint.x + stepByRotation,
          y: lastStartPoint.y
        }) && r === "topRight") {

          newStartPoint = {
            x: lastStartPoint.x + stepByRotation,
            y: lastStartPoint.y
          }

          // down
          result = this.straightLineDown(3, newStartPoint)
          if (result.canGo) {
            maxCupe -= 3
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
            newStartPoint = result.lastDirection;
          }

          // left
          result = this.straightLineLeft(1, newStartPoint)
          if (result.canGo) {
            maxCupe -= 1
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }

          this.newStartPoint.x = shapePoint[0].x;
          this.newStartPoint.y = shapePoint[0].y;
        }

        // check for direction want to go
        if (this.canGoHere({
          x: lastStartPoint.x,
          y: lastStartPoint.y + stepByRotation
        }) && r === "downRight") {

          newStartPoint = {
            x: lastStartPoint.x,
            y: lastStartPoint.y + stepByRotation
          }

          // left
          result = this.straightLineLeft(3, newStartPoint)
          if (result.canGo) {
            maxCupe -= 3
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
            newStartPoint = result.lastDirection;
          }

          // top
          result = this.straightLineTop(1, newStartPoint)
          if (result.canGo) {
            maxCupe -= 1
            shapePoint.push({
              x: newStartPoint.x,
              y: newStartPoint.y - 1
            });
            newStartPoint = result.lastDirection;
          }

          this.newStartPoint.x = shapePoint[0].x;
          this.newStartPoint.y = shapePoint[0].y;

          console.log(shapePoint);
        }


        break;
    }
  }

  getCubePoints(centerX, centerY) {
    let points = [];

    // row 1
    points.push({
      x: centerX - 1,
      y: centerY - 1
    })
    points.push({
      x: centerX,
      y: centerY - 1
    })
    points.push({
      x: centerX + 1,
      y: centerY - 1
    })

    // row 2
    points.push({
      x: centerX - 1,
      y: centerY
    })
    points.push({
      x: centerX,
      y: centerY
    })
    points.push({
      x: centerX + 1,
      y: centerY
    })

    // row 3
    points.push({
      x: centerX - 1,
      y: centerY + 1
    })
    points.push({
      x: centerX,
      y: centerY + 1
    })
    points.push({
      x: centerX + 1,
      y: centerY + 1
    })

    return points;
  }

  canGoHere(direction) {
    const points = this.getCubePoints(2, 2)
    let canGo = false;
    points.forEach(({ x, y }) => {
      if (x === direction.x && y === direction.y) {
        canGo = true
      }
    })

    return canGo
  }

  straightLineDown(lineNumYouWantToGo, newStartPoint) {
    let canGo = true
    let directions = []
    let newDirection

    for (let i = 0; i < lineNumYouWantToGo; i++) {
      if (!canGo) break;

      newDirection = {
        x: newStartPoint.x,
        y: newStartPoint.y + i
      }

      if (!this.canGoHere(newDirection)) {
        console.error("problem")
        canGo = false
        break;
      }

      directions.push(newDirection)
    }

    return {
      canGo: canGo,
      directions: directions,
      lastDirection: newDirection
    }
  }

  straightLineLeft(lineNumYouWantToGo, newStartPoint) {
    let canGo = true
    let directions = []
    let newDirection

    for (let i = 0; i < lineNumYouWantToGo; i++) {
      if (!canGo) continue;

      newDirection = {
        x: newStartPoint.x - i,
        y: newStartPoint.y
      }

      if (!this.canGoHere(newDirection)) {
        console.error("problem")
        canGo = false
        break;
      }

      directions.push(newDirection)
    }

    return {
      canGo: canGo,
      directions: directions,
      lastDirection: newDirection
    }
  }

  straightLineTop(lineNumYouWantToGo, newStartPoint) {
    let canGo = true
    let directions = []
    let newDirection

    for (let i = 0; i < lineNumYouWantToGo; i++) {
      if (!canGo) continue;

      newDirection = {
        x: newStartPoint.x,
        y: newStartPoint.y - i
      }

      if (!this.canGoHere(newDirection)) {
        console.error("problem")
        canGo = false
        break;
      }

      directions.push(newDirection)
    }

    return {
      canGo: canGo,
      directions: directions,
      lastDirection: newDirection
    }
  }


}