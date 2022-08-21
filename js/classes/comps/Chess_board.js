class Chess_board extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene;
        this.home_size = 112
        this.selected = []
        this.directions = config.directions

        this.board = this.scene.add.image(game.config.width / 2, game.config.height / 2, "board")

        // selected_home_preview
        if (config.directions_type === "show_movement")
            this.image_name = "selected_home"
        else
            this.image_name = "selected_home_preview"

        if (this.directions.length !== 0) {
            config.directions.forEach((element) => {
                let { x, y } = element
                let selected = this.scene.add.image(this.get_x(x), this.get_y(y), this.image_name)
                selected.name = "movement_place"
                selected.directions_type = config.directions_type
                selected.directions = {
                    x: x,
                    y: y
                }
                selected.setInteractive()
                this.selected.push(selected)
            });
        }

        this.add(this.selected)
        this.scene.add.existing(this);
    }

    get_x(x) {
        x = 8 - x
        return (game.config.width / 1.16) - (x * this.home_size)
    }

    get_y(y) {
        y = 8 - y
        return (game.config.height / 1.415) - (y * this.home_size)
    }
}
