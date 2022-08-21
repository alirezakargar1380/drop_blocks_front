class Nut extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);
    this.scene = config.scene
    this.nut_color = config.nut_color
    this.home_size = 112
    let image = this.get_nut_image_name(config.nut_name)
    this.x = config.x
    this.y = parseInt(config.y)

    this.nut = this.scene.add.image(this.get_x(config.x), this.get_y(config.y), image)

    // config.rival
    if (config.rival) {
      this.nut.name = "movement_place"
      this.nut.directions_type = "show_movement"
    } else
      this.nut.name = "nut"

    this.nut.nut_name = config.nut_name
    this.nut.nut_color = this.nut_color
    this.nut.directions = {
      x: config.x,
      y: config.y
    }
    this.add(this.nut)
    this.nut.setInteractive()

    if (config.selected) {


      this.selected_nut = this.scene.add.image(
          this.get_x(config.x),
          this.get_y(config.y),
          this.get_selected_nut_image_name(config.nut_name)
      )

      this.add(this.selected_nut)
    } else {
      let image

      if (config.rival === false && config.nut_name === "king") {

        if (config.check) {
          image = "check_"+this.get_selected_nut_image_name(config.nut_name)
          this.check_nut = this.scene.add.image(
              this.get_x(config.x),
              this.get_y(config.y),
              image
          )

          this.add(this.check_nut)
        }

      }

    }

    this.scene.add.existing(this);
  }

  get_x(x) {
    if (this.y === 0) {
      x = 9 - x
      const num = (game.config.width / 1.16) - (x * this.home_size) - ((this.x-1)*(this.home_size/2))
      return Number(num.toFixed(0))
    }
    if (this.y === 9) {
      x = 9 - x
      const num = (game.config.width / 1.16) - (x * this.home_size) - ((this.x-1)*(this.home_size/2))
      return Number(num.toFixed(0))
    }
    x = 8 - x
    const num = (game.config.width / 1.165) - (x * this.home_size)
    return Number(num.toFixed(0))
  }

  get_y(y) {
    if (this.y === 0) {
      y = 9
      let num = (game.config.height / 1.400) - (y * this.home_size)
      return Number(num.toFixed(0))
    }
    if (this.y === 9) {
      y = 0
      let num = (game.config.height / 1.240) - (y * this.home_size)
      return Number(num.toFixed(0))
    }
    y = 8 - y
    const num = (game.config.height / 1.420) - (y * this.home_size)
    return Number(num.toFixed(0))
  }

  get_nut_image_name(nut_name) {
    return this.nut_color + "_" + nut_name + "_nut"
  }

  get_selected_nut_image_name(nut_name) {
    return nut_name + "_nut_selected"
  }
}