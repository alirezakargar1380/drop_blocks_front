class TurnBox extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);

        this.scene = config.scene;
        this.width = game.config.width
        this.client_id = config.client_id

        this.turnText = this.scene.add.text(
            0,
            0,
            "نوبت توعه",
            {
                fontFamily: 'lalezar',
                fontSize: game.config.width / 13,
                align: 'center',
                color: '#fff600',
                fixedWidth: game.config.width / 2,
                padding: {
                    top: 20,
                    bottom: 20
                },
                shadow: {
                    offsetX: 0,
                    offsetY: 0,
                    color: '#fff600bd',
                    blur: 20,
                    stroke: false,
                    fill: true
                }
            }
        )
        this.turnText.setOrigin(0.5, 0.5)
        this.add(this.turnText)

        emitter.on(G.EVENT_NEW_ROUND, this.newRound.bind(this))
        // socket.on("boxesAndDots_game_result", this.newRound.bind(this), this)

        this.scene.add.existing(this);
    }

    newRound() {
        if (model.turn === this.client_id) {
            this.turnText.setText('نوبت توعه')
            this.turnText.setColor('#fff600')
            this.turnText.setShadowFill(true);
        }else {
            this.turnText.setText('صبر کن')
            this.turnText.setColor('#ffffff')
            this.turnText.setShadowFill(false);
        }
    }

}
