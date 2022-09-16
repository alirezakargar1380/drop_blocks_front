class SceneChessBoard extends Phaser.Scene {
  constructor() {
    super();
    this.clicked = false
    this.shapeMoved = false
    this.clickedPositions = {
      x: 0,
      y: 0
    }
    this.direction = {
      "topRight": "topRight",
      "right": "right",
      "downRight": "downRight",
      "down": "down",
      "downLeft": "downLeft",
      "left": "left",
      "topLeft": "topLeft",
      "top": "top",
      "center": "center"
    }
    this.shapes = {
      "L": {
        name: "L",
        rotations: {
          "topRight": false,
          "downRight": false,
          "downLeft": false,
          "topLeft": true
        }
      },
      "T": {
        name: "T",
        rotations: {
          "centerTop": true,
          "centerRight": false,
          "centerDown": true,
          "centerLeft": false
        }
      },
      "LT": {
        name: "LT",
        rotations: {
          "top": false,
          "right": true,
          "down": false,
          "left": false
        }
      },
      "ZL": {
        name: "ZL",
        rotations: {
          left: true,
          top: false
        }
      },
      "ZR": {
        name: "ZR",
        rotations: {
          right: true,
          top: false
        }
      },
      "I": {
        name: "I",
        rotations: {
          down: false,
          top: true
        }
      },
      "cube": {
        name: "cube",
        rotations: {
          center: true
        }
      }
    }
    this.newStartPoint = {
      x: 1, y: 1
    }
    this.center = {
      x: 5, y: 2
    }
    this.gameObjects = []
    this.filledHomes = {}
    this.blocks = {}
  }

  preload() {
    this.load.image("b_b", "images/b_b.png");
    this.load.image("grid", "images/grid.png");

    this.load.plugin('rexdropshadowpipelineplugin', 'plugins/rexdropshadowpipelineplugin.min.js', true);
  }

  create() {
    // socket.emit("message")

    // =============================================================================== DRAW SHAPE
    this.nextShapeName = this.selectRandomShapeName()
    let selectedShapee = this.shapes["cube"]
    this.sh = new Shape(selectedShapee.name, selectedShapee.rotations, { x: 1, y: 1 })

    // grid
    this.add.image(game.config.width / 2, game.config.height / 2, "grid");

    this.input.on('pointermove', function (pointer) {
      if (!this.clicked || this.shapeMoved) return
      if (this.getDistance(this.clickedPositions, pointer) < 22) return

      let angle = this.get_angle(this.clickedPositions.x, this.clickedPositions.y, pointer.x, pointer.y)

      if (angle >= 45 && angle <= 135) {
        this.sh.right()
        this.removeAndDraw()
        // socket.emit("right")
      }

      if (angle > 225 && angle <= 315) {
        this.sh.left()
        this.removeAndDraw()
      }

      if (angle > 315 && angle <= 360 || angle >= 0 && angle < 45) {
        // socket.emit("speed", "fast")
      }

      this.shapeMoved = true
    }, this)

    this.input.on('pointerdown', function (pointer) {
      // console.error(pointer.x, pointer.y)
      this.clickedPositions.x = pointer.x
      this.clickedPositions.y = pointer.y
      this.clicked = true
    }, this)

    this.input.on('pointerup', function (pointer) {
      this.clicked = false
      this.shapeMoved = false
      // socket.emit("speed", "slow")
    }, this)

    // console.log(this.getCubePoints(2, 2))
    // CURRETLY IN topLeft
    // const newShapePoints = this.getShapePoints(this.shapes.LT.name, 3, this.center, this.direction.top)

    // let newShapePoints = this.getShapePoints(this.shapes.cube.name, 3, this.center, this.direction.center)
    // newShapePoints.forEach(({ x, y }) => {
    //   const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
    //   this.gameObjects.push(imag)
    // })

    // newShapePoints = this.getShapePoints(this.shapes.ZL.name, 3, this.center, this.direction.left)
    // newShapePoints.forEach(({ x, y }) => {
    //   const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
    //   this.gameObjects.push(imag)
    // })

    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "downRight")
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "downLeft")
    // this.getShapePoints(this.shapes.L, 2, this.newStartPoint, "topLeft")


    // const Tshape = this.getShapePoints(this.shapes.T.name, 3, this.center, "centerTop")
    // console.log(Tshape)

    // const Tshape = this.getShapePoints(this.shapes.T.name, 3, this.center, "centerRight")
    // console.log(Tshape)

    // const Tshape = this.getShapePoints(this.shapes.T.name, 3, this.center, "centerDown")
    // console.log(Tshape)

    // const Tshape = this.getShapePoints(this.shapes.T.name, 3, this.center, "centerLeft")
    // console.log(Tshape)

    // this.add.image(this.getX(1), this.getY(1), "b_b");
    // this.add.image(this.getX(2), this.getY(1), "b_b");

    // socket.on("message", (coor) => {
    //   coor.filled.forEach(({x,y}) => {
    //     const name = `${x}_${y}`
    //     if(!this.filledHomes[name]) {
    //       this.filledHomes[name] = this.add.image(this.getX(x), this.getY(y), "b_b");
    //     }
    //   })

    //   this.gameObjects.forEach((gameObjects) => {
    //     gameObjects.destroy();
    //   })

    //   coor.filledHome.forEach(({ x, y }) => {
    //     const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
    //     this.gameObjects.push(imag)
    //   })

    //   return
    //   this.center = coor
    //   const currentRotationName = this.getCurrentShapeRotaion(this.shapes.LT.rotations)
    //   const newShapePoints = this.getShapePoints(this.shapes.LT.name, 2, this.center, currentRotationName)

    //   this.gameObjects.forEach((gameObjects) => {
    //     gameObjects.destroy();
    //   })

    //   newShapePoints.forEach(({ x, y }) => {
    //     const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
    //     this.gameObjects.push(imag)
    //   })
    // }, this)

    this.counter = 0
    // should select next shape name and rotation
    setInterval(() => {
      if (this.counter > 2) return
      if (!this.sh.drop(Object.keys(this.blocks))) {

        this.gameObjects.forEach((gameObjects) => {
          gameObjects.destroy();
        })

        this.sh.getShape().forEach(({ x, y }) => {
          let img = this.add.image(this.getX(x), this.getY(y), "b_b");
          img.name = "b_b"
          this.blocks[x + "," + y] = img
        })

        // console.log(this.blocks)
        console.error("FINISH")
        this.counter++
        this.nextShape()
        this.completeCloumns()
        return
      }

      this.removeAndDraw()

      return
      this.center.x = this.center.x
      this.center.y = this.center.y + 1

      let nextRotaionResult = this.getNextRotation(this.shapes.T.rotations)
      this.shapes.T.rotations = nextRotaionResult.newRotaionObject

      const newShapePoints = this.getShapePoints(this.shapes.T.name, 3, this.center, nextRotaionResult.nextRotaionName)

      this.gameObjects.forEach((gameObjects) => {
        gameObjects.destroy();
      })

      newShapePoints.forEach(({ x, y }) => {
        const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
        this.gameObjects.push(imag)
      })

      // return
      // const currentRotationName = this.getCurrentShapeRotaion(this.shapes.L.rotations)

      // this.center.x = this.center.x
      // this.center.y = this.center.y + 1

      // let nextRotaionResult = this.getNextRotation(this.shapes.L.rotations)
      // this.shapes.L.rotations = nextRotaionResult.newRotaionObject
      // const newShapePoints = this.getShapePoints(this.shapes.L.name, 2, this.center, nextRotaionResult.nextRotaionName)

      // const currentRotationName = this.getCurrentShapeRotaion(this.shapes.L.rotations)
      // const newShapePoints = this.getShapePoints(this.shapes.L.name, 2, this.center, currentRotationName)

      // this.gameObjects.forEach((gameObjects) => {
      //   gameObjects.destroy();
      // })

      // newShapePoints.forEach(({ x, y }) => {
      //   const imag = this.add.image(this.getX(x), this.getY(y), "b_b");
      //   this.gameObjects.push(imag)
      // })

      // console.log("-----------------")

    // }, 800)
    }, 400)


    // console.log(s.getShape())
    // let selectedShape = this.shapes[this.selectRandomShapeName()]
    // let selectedShape = this.shapes["L"]
    // console.log(selectedShape)


  }

  completeCloumns() {
    let completedY
    for (let y = 1; y <= 20; y++) {
      let counter = 0
      for (let x = 1; x <= 10; x++) {
        if (this.blocks[x + "," + y]) {
          counter++
        }
      }

      if (counter == 10) {
        completedY = y
        console.error("COMPLETED", y)
        for (let x = 1; x <= 10; x++) {
          if (this.blocks[x + "," + y]) {
            this.plugins.get('rexdropshadowpipelineplugin').remove(this.blocks[x + "," + y]);
            this.blocks[x + "," + y].destroy()
            delete this.blocks[x + "," + y]
          }
        }

        setTimeout(() => {

          Object.keys(this.blocks).forEach((key) => {
            const coor = key.split(",")
            let x = parseInt(coor[0])
            let y = parseInt(coor[1])
            let colorName = this.blocks[x + "," + y].name
            this.blocks[x + "," + y].destroy()
            delete this.blocks[x + "," + y]
            y++
            if (y <= completedY) {
              let img = this.add.image(this.getX(x), this.getY(y), colorName);
              img.name = colorName
              this.blocks[x + "," + y] = img
            }
          })

        }, 200)



      }
    }
  }

  nextShape() {
    let selectedShapee

    switch (this.counter) {
      case 1:
        this.nextShapeName = "I" // test
        selectedShapee = this.shapes[this.nextShapeName]
        this.sh = new Shape(selectedShapee.name, selectedShapee.rotations, { x: 4, y: 1 })
        break;
      case 2:
        this.nextShapeName = "I" // test
        selectedShapee = this.shapes[this.nextShapeName]
        this.sh = new Shape(selectedShapee.name, selectedShapee.rotations, { x: 8, y: 1 })
        break;
      default:
        break;
    }

    this.nextShapeName = "T" // test
    // let selectedShapee = this.shapes[this.nextShapeName]
    // this.sh = new Shape(selectedShapee.name, selectedShapee.rotations)
    // this.nextShapeName = this.selectRandomShapeName()
  }

  removeAndDraw() {
    this.gameObjects.forEach((gameObjects) => {
      this.plugins.get('rexdropshadowpipelineplugin').remove(gameObjects)
      gameObjects.destroy();
    })

    this.sh.getShape().forEach(({ x, y }) => {
      const img = this.add.image(this.getX(x), this.getY(y), "b_b");
      this.addShadowToGameObject(img)
      this.gameObjects.push(img)
    })
  }

  addShadowToGameObject(gameObject) {
    // return
    this.plugins.get('rexdropshadowpipelineplugin').add(gameObject, {
      // ** Offset **
      // rotation: 
      angle: 0,      // degrees
      distance: 0,

      // ** Shadow color **
      shadowColor: 0x018F8E,
      alpha: 0.8,

      // shadowOnly: false,

      // ** Parameters of KawaseBlur **
      blur: 10,
      quality: 5,
      // pixelWidth: 1,
      // pixelHeight: 1,

      // name: 'rexDropShadowPostFx'
    });
  }

  stickCubes() {

  }

  randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectRandomShapeName() {
    let shapeNames = Object.keys(this.shapes).map((shapeName) => { return shapeName })
    let shapeIndex = this.randomInteger(0, shapeNames.length - 1)
    return shapeNames[shapeIndex]
  }

  getShapePoints(shapeName, stepByRotation, lastStartPoint, r) {
    let newStartPoint
    let shapePoint = [];
    let counter = 0;
    let maxCupe = 4;
    let result
    switch (shapeName) {
      case "L":
        newStartPoint = this.getCoorByDirection(r, lastStartPoint.x, lastStartPoint.y)

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "topRight") {
          console.log("topRight")
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

        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "downRight") {
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

          // console.log(shapePoint);
        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "downLeft") {
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

        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "topLeft") {
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
        }

        break;
      case "T":

        // centerTop
        newStartPoint = this.getCoorByDirection("topLeft", lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === "centerTop") {
          console.log("center top")
          // right
          result = this.straightLineRight(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // centerRight
        newStartPoint = this.getCoorByDirection("topRight", lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === "centerRight") {
          console.log("center right")
          // down
          result = this.straightLineDown(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // centerDown
        newStartPoint = this.getCoorByDirection("downRight", lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === "centerDown") {
          console.log("center down")
          // down
          result = this.straightLineLeft(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // centerLeft
        newStartPoint = this.getCoorByDirection("downLeft", lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === "centerLeft") {
          console.log("center left")
          // top
          result = this.straightLineTop(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        shapePoint.push({
          x: this.center.x,
          y: this.center.y
        });
        break;
      case "LT":

        // top
        newStartPoint = this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.top) {
          // top
          shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
          // down
          result = this.straightLineDown(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // right
        newStartPoint = this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.right) {
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineLeft(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // down
        newStartPoint = this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.down) {
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineTop(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // left
        newStartPoint = this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.left) {
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineRight(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }


        break;
      case "ZL":
        // left
        if (r === this.direction.left) {
          // left
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // downRight
          shapePoint.push(this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y))
        }

        // top
        if (r === this.direction.top) {
          // topRight
          shapePoint.push(this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y))
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
        }
        break;
      case "ZR":
        // right
        if (r === this.direction.right) {
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // downLeft
          shapePoint.push(this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y))
        }

        // top
        if (r === this.direction.top) {
          // topRight
          shapePoint.push(this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y))
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
        }
        break;
      case "I":
        if (r === this.direction.top) {
          shapePoint.push(this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x + 1, lastStartPoint.y - 1))
        }
        if (r === this.direction.down) {
          shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y + 1))
        }
        break;
      case "cube":
        shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
        shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
        shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
        shapePoint.push(this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y))
        break;
      default:
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

  getCurrentShapeRotaion(shapeRotationObject) {
    let rotationName
    Object.keys(shapeRotationObject).forEach((keyItem) => {
      if (shapeRotationObject[keyItem]) {
        rotationName = keyItem
      }
    })
    return rotationName
  }

  getCubePoints(centerX, centerY) {
    let points = [];

    // row 1
    points.push(this.getCoorByDirection("topLeft", centerX, centerY))
    points.push(this.getCoorByDirection("top", centerX, centerY))
    points.push(this.getCoorByDirection("topRight", centerX, centerY))

    // row 2
    points.push(this.getCoorByDirection("left", centerX, centerY))
    points.push(this.getCoorByDirection("center", centerX, centerY))
    points.push(this.getCoorByDirection("right", centerX, centerY))

    // row 3
    points.push(this.getCoorByDirection("downLeft", centerX, centerY))
    points.push(this.getCoorByDirection("down", centerX, centerY))
    points.push(this.getCoorByDirection("downRight", centerX, centerY))

    return points;
  }

  getCoorByDirection(dir, x, y) {
    let coor = {}

    switch (dir) {
      case "topLeft":
        coor.x = x - 1
        coor.y = y - 1
        break;

      case "top":
        coor.x = x
        coor.y = y - 1
        break;

      case "topRight":
        coor.x = x + 1
        coor.y = y - 1
        break;

      case "left":
        coor.x = x - 1
        coor.y = y
        break;

      case "center":
        coor.x = x
        coor.y = y
        break;

      case "right":
        coor.x = x + 1
        coor.y = y
        break;

      case "downLeft":
        coor.x = x - 1
        coor.y = y + 1
        break;

      case "down":
        coor.x = x
        coor.y = y + 1
        break;

      case "downRight":
        coor.x = x + 1
        coor.y = y + 1
        break;

      default:
        break;
    }

    return coor
  }

  // canGoHere(direction) {
  //   const points = this.getCubePoints(this.center.x, this.center.y)
  //   let canGo = false;
  //   points.forEach(({ x, y }) => {
  //     if (x === direction.x && y === direction.y) {
  //       canGo = true
  //     }
  //   })

  //   return canGo
  // }

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
    let defaultX = 350 - (38 / 2)

    return defaultX + (x * 38);
  }

  getY(y) {
    let defaultY = 160 - (38 / 2)

    return defaultY + (y * 38);
  }

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  getDistance(from, to) {
    let x = to.y - from.y
    let y = to.x - from.x

    return Math.sqrt(x * x + y * y)
  }

  get_angle(x1, y1, x2, y2) {
    let angle_final
    let angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 180;
    if (angle >= 270) {
      angle_final = 360 - (parseInt(angle.toFixed(0)) - 270)
    } else {
      angle_final = Math.abs(angle.toFixed(0) - 270)
    }

    return angle_final
  }

}

class WorldCoordinate {
  constructor() {
    this.center = {}
  }

  getCubePoints(centerX, centerY) {
    let points = [];

    // row 1
    points.push(this.getCoorByDirection("topLeft", centerX, centerY))
    points.push(this.getCoorByDirection("top", centerX, centerY))
    points.push(this.getCoorByDirection("topRight", centerX, centerY))

    // row 2
    points.push(this.getCoorByDirection("left", centerX, centerY))
    points.push(this.getCoorByDirection("center", centerX, centerY))
    points.push(this.getCoorByDirection("right", centerX, centerY))

    // row 3
    points.push(this.getCoorByDirection("downLeft", centerX, centerY))
    points.push(this.getCoorByDirection("down", centerX, centerY))
    points.push(this.getCoorByDirection("downRight", centerX, centerY))

    return points;
  }

  canGoHere(direction) {
    const points = this.getCubePoints(this.center.x, this.center.y)

    let canGo = false;
    points.forEach(({ x, y }) => {
      if (x === direction.x && y === direction.y) {
        canGo = true
      }
    })

    return canGo
  }

  getCoorByDirection(dir, x, y) {
    let coor = {}

    switch (dir) {
      case "topLeft":
        coor.x = x - 1
        coor.y = y - 1
        break;

      case "top":
        coor.x = x
        coor.y = y - 1
        break;

      case "topRight":
        coor.x = x + 1
        coor.y = y - 1
        break;

      case "left":
        coor.x = x - 1
        coor.y = y
        break;

      case "center":
        coor.x = x
        coor.y = y
        break;

      case "right":
        coor.x = x + 1
        coor.y = y
        break;

      case "downLeft":
        coor.x = x - 1
        coor.y = y + 1
        break;

      case "down":
        coor.x = x
        coor.y = y + 1
        break;

      case "downRight":
        coor.x = x + 1
        coor.y = y + 1
        break;

      default:
        break;
    }

    return coor
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

}

class getShapeCoordinate extends WorldCoordinate {
  constructor() {
    super();
    this.allShapeDirectionsName = {
      topRight: "topRight",
      right: "right",
      downRight: "downRight",
      down: "down",
      downLeft: "downLeft",
      left: "left",
      topLeft: "topLeft",
      top: "top",
      center: "center",
      centerTop: "centerTop",
      centerRight: "centerRight",
      centerDown: "centerDown",
      centerLeft: "centerLeft"
    }
  }

  setCenterPoint(x, y) {
    this.center.x = x
    this.center.y = y
  }

  getShapePoints(shapeName, stepByRotation, r) {
    let newStartPoint
    let shapePoint = [];
    let counter = 0;
    let maxCupe = 4;
    let result

    switch (shapeName) {
      case "L":
        newStartPoint = this.getCoorByDirection(r, this.center.x, this.center.y)

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "topRight") {
          console.log("topRight")
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

        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "downRight") {
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

          // console.log(shapePoint);
        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "downLeft") {
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

        }

        // check for direction want to go
        if (this.canGoHere(newStartPoint) && r === "topLeft") {
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
        }

        break;
      case "cube":
        shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.top, this.center.x, this.center.y))
        shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.center, this.center.x, this.center.y))
        shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.right, this.center.x, this.center.y))
        shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.topRight, this.center.x, this.center.y))
        break;
      case "T":
        // centerTop
        newStartPoint = this.getCoorByDirection("topLeft", this.center.x, this.center.y)
        // console.log(newStartPoint)
        // console.log(this.canGoToThisCoordinate(newStartPoint))
        if (this.canGoHere(newStartPoint) && r === this.allShapeDirectionsName.centerTop) {
          // right
          result = this.straightLineRight(stepByRotation, newStartPoint)

          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }

        }

        // centerRight
        newStartPoint = this.getCoorByDirection("topRight", this.center.x, this.center.y)
        if (this.canGoHere(newStartPoint) && r === "centerRight") {
          console.log("center right")
          // down
          result = this.straightLineDown(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // centerDown
        newStartPoint = this.getCoorByDirection("downRight", this.center.x, this.center.y)
        if (this.canGoHere(newStartPoint) && r === "centerDown") {
          console.log("center down")
          // down
          result = this.straightLineLeft(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // centerLeft
        newStartPoint = this.getCoorByDirection("downLeft", this.center.x, this.center.y)
        if (this.canGoHere(newStartPoint) && r === "centerLeft") {
          console.log("center left")
          // top
          result = this.straightLineTop(stepByRotation, newStartPoint)
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        shapePoint.push({
          x: this.center.x,
          y: this.center.y
        });
        break;
      case "LT":
        // top
        newStartPoint = this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.top) {
          // top
          shapePoint.push(this.getCoorByDirection(this.direction.top, lastStartPoint.x, lastStartPoint.y))
          // down
          result = this.straightLineDown(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // right
        newStartPoint = this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.right) {
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineLeft(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // down
        newStartPoint = this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.down) {
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineTop(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }

        // left
        newStartPoint = this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y)
        if (this.canGoHere(newStartPoint) && r === this.direction.left) {
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // left
          result = this.straightLineRight(3, newStartPoint);
          if (result.canGo) {
            result.directions.forEach((dir) => {
              shapePoint.push(dir);
            })
          }
        }


        break;
      case "ZL":
        // left
        if (r === this.direction.left) {
          // left
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // downRight
          shapePoint.push(this.getCoorByDirection(this.direction.downRight, lastStartPoint.x, lastStartPoint.y))
        }

        // top
        if (r === this.direction.top) {
          // topRight
          shapePoint.push(this.getCoorByDirection(this.direction.topRight, lastStartPoint.x, lastStartPoint.y))
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
        }
        break;
      case "ZR":
        // right
        if (r === this.direction.right) {
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.right, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
          // downLeft
          shapePoint.push(this.getCoorByDirection(this.direction.downLeft, lastStartPoint.x, lastStartPoint.y))
        }

        // top
        if (r === this.direction.top) {
          // topRight
          shapePoint.push(this.getCoorByDirection(this.direction.topLeft, lastStartPoint.x, lastStartPoint.y))
          // right
          shapePoint.push(this.getCoorByDirection(this.direction.left, lastStartPoint.x, lastStartPoint.y))
          // center
          shapePoint.push(this.getCoorByDirection(this.direction.center, lastStartPoint.x, lastStartPoint.y))
          // down
          shapePoint.push(this.getCoorByDirection(this.direction.down, lastStartPoint.x, lastStartPoint.y))
        }
        break;
      case "I":
        if (r === this.allShapeDirectionsName.top) {
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.topLeft, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.top, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.topRight, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.right, this.center.x + 1, this.center.y - 1))
        }
        if (r === this.allShapeDirectionsName.down) {
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.top, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.center, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.down, this.center.x, this.center.y))
          shapePoint.push(this.getCoorByDirection(this.allShapeDirectionsName.down, this.center.x, this.center.y + 1))
        }
        break;
      default:
        break;
    }

    return shapePoint
  }
}

class Shape extends getShapeCoordinate {
  // class Shape {
  constructor(name, rotations, startCoor) {
    super(name)
    this.shapeName = name
    this.shapeRotaions = rotations
    this.shapePoints = []
    this.selectedRotation = this.getCurrentShapeRotaion()
    this.setCenterPoint(startCoor.x, startCoor.y)
    // console.log(">>>>>>>>>>>>>", this.center, "<<<<<<<<<<<<<<<<<<<")
  }

  drop(blocks) {
    this.center.y++
    let checkResult = true

    checkResult = this.checkOtherBlocks(blocks)
    // this.checkOtherBlocks(blocks)

    if (checkResult) {
      checkResult = this.canDrop()
      if (!checkResult) this.center.y--
    } else {
      console.error("reson is check other blocks")
    }

    return checkResult

    if (this.center.y >= 19) {
      return false
    }

    this.center.y++
    return true
  }

  checkOtherBlocks(blocks) {
    let checkResult = true
    blocks.forEach((key) => {
      const coordinate = key.split(",")
      const xx = parseInt(coordinate[0])
      const yy = parseInt(coordinate[1])
      this.getShape().forEach(({ x, y }) => {
        if (xx == x && yy == y) {
          checkResult = false
        }
      })
    })
    if (!checkResult) this.center.y--
    return checkResult
  }

  getShape() {
    this.shapePoints = this.getShapePoints(this.shapeName, 3, this.selectedRotation)
    return this.shapePoints
  }

  right() {
    if (this.center.x >= 9) {
      return false
    }

    this.center.x++
    return true
  }

  left() {
    if (this.center.x <= 2) {
      return false
    }

    this.center.x--
    return true
  }

  canDrop() {
    let canGo = true

    this.getShape().forEach(({ x, y }) => {
      if (y > 20) {
        canGo = false
      }
    })

    return canGo
  }

  getCurrentShapeRotaion() {
    let rotationName
    Object.keys(this.shapeRotaions).forEach((keyItem) => {
      if (this.shapeRotaions[keyItem]) {
        rotationName = keyItem
      }
    })
    return rotationName
  }

}