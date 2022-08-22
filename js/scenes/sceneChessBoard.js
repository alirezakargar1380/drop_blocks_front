class SceneChessBoard extends Phaser.Scene {
  constructor() {
    super();
    this.shapes = {
      "L": {
        name: "L",
        rotations: {
          "topRight": false,
          "downRight": false,
          "downLeft": true,
          "topLeft": false
        }
      }
    }
    this.newStartPoint = {
      x: 1, y: 1
    }
    this.gameObjects = []
  }

  preload() {
    this.load.image("b_b", "images/b_b.png");
  }

  create() {
    // console.log(this.getCubePoints(2, 2))
    // CURRETLY IN topLeft
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "topRight")
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "downRight")
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "downLeft")
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "topLeft")

    // this.add.image(this.getX(1), this.getY(1), "b_b");
    // this.add.image(this.getX(2), this.getY(1), "b_b");

    setInterval(() => {
      let nextRotaionResult = this.getNextRotation(this.shapes.L.rotations)
      this.shapes.L.rotations = nextRotaionResult.newRotaionObject
      const newShapePoints = this.getShapePoints(this.shapes.L.name, 2, this.newStartPoint, nextRotaionResult.nextRotaionName)

      this.gameObjects.forEach((gameObjects) => {
        gameObjects.destroy();
      })

      newShapePoints.forEach(({x, y}) => {
        
        const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
        this.gameObjects.push(imag)
      })
      // console.log("-----------------")
    }, 1000)

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
          maxCupe -= 1
          shapePoint.push({
            x: newStartPoint.x - 1,
            y: newStartPoint.y
          });

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
          maxCupe -= 1
          shapePoint.push({
            x: newStartPoint.x,
            y: newStartPoint.y - 1
          });

          this.newStartPoint.x = shapePoint[0].x;
          this.newStartPoint.y = shapePoint[0].y;

          // console.log(shapePoint);
        }

        // check for direction want to go
        if (this.canGoHere({
          x: lastStartPoint.x - stepByRotation,
          y: lastStartPoint.y
        }) && r === "downLeft") {
          newStartPoint = {
            x: lastStartPoint.x - stepByRotation,
            y: lastStartPoint.y
          }

          // top
          result = this.straightLineTop(3, newStartPoint);
          if (result.canGo) {
            maxCupe -= 3;
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
            newStartPoint = result.lastDirection;
          }

          // right
          maxCupe -= 1
          shapePoint.push({
            x: newStartPoint.x + 1,
            y: newStartPoint.y
          });

          this.newStartPoint.x = shapePoint[0].x;
          this.newStartPoint.y = shapePoint[0].y;

        }

        // check for direction want to go
        if (this.canGoHere({
          x: lastStartPoint.x,
          y: lastStartPoint.y - stepByRotation
        }) && r === "topLeft") {
          newStartPoint = {
            x: lastStartPoint.x,
            y: lastStartPoint.y - stepByRotation
          }

          // right
          result = this.straightLineRight(3, newStartPoint);
          if (result.canGo) {
            maxCupe -= 3;
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
            newStartPoint = result.lastDirection;
          }

          // down
          maxCupe -= 1
          shapePoint.push({
            x: newStartPoint.x,
            y: newStartPoint.y + 1
          });

          this.newStartPoint.x = shapePoint[0].x;
          this.newStartPoint.y = shapePoint[0].y;
        }

        break;
    }

    return shapePoint
  }

  getNextRotation(shapeRotationObject) {
    let nextIs = false
    let foundNext = false
    let nextRotaionName
    let shapeRotaitons = Object.keys(shapeRotationObject)

    Object.keys(shapeRotationObject).forEach((keyItem, index) => {

      if (foundNext) return
      if (nextIs) {
        Object.keys(shapeRotationObject).forEach((key) => {
          shapeRotationObject[key] = false
        })
        shapeRotationObject[keyItem] = true
        foundNext = true
        nextRotaionName = keyItem
      }

      if (shapeRotationObject[keyItem]) {
        nextIs = true
      }

      if (index === shapeRotaitons.length - 1 && nextIs && !foundNext) nextIs = false

    })

    if (!nextIs) {
      Object.keys(shapeRotationObject).forEach((key) => {
        shapeRotationObject[key] = false
      })
      shapeRotationObject[shapeRotaitons[0]] = true;
      nextRotaionName = shapeRotaitons[0]
    }

    return {
      newRotaionObject: shapeRotationObject,
      nextRotaionName: nextRotaionName
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

  straightLineRight(lineNumYouWantToGo, newStartPoint) {
    let canGo = true
    let directions = []
    let newDirection

    for (let i = 0; i < lineNumYouWantToGo; i++) {
      if (!canGo) continue;

      newDirection = {
        x: newStartPoint.x + i,
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

  getX(x) {
    let defaultX = 100

    return defaultX + (x * 38);
  }

  getY(y) {
    let defaultY = 100

    return defaultY + (y * 38);
  }

}