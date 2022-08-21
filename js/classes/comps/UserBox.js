class UserBox extends Phaser.GameObjects.Container {


    constructor(config) {
        super(config.scene);
        this.client_id = config.client_id
        this.scene = config.scene;
        this.width = game.config.width / 4
        this.height = this.width * 1.3
        // console.log(config)

        this.avatar = this.scene.add.image(
            0,
            - (game.config.height / 18),
            config.avatar_key
        )
        this.add(this.avatar)
        this.avatar.displayHeight = game.config.height / 14;
        this.avatar.scaleX = this.avatar.scaleY;
        this.avatar.setOrigin(0.5, 0.8)


        this.avatar_mask = this.scene.add.image(
            0,
            - (game.config.height / 18).toFixed(0),
            'avatar_mask'
        )
        this.add(this.avatar_mask)
        this.avatar_mask.displayHeight = (game.config.height / 14).toFixed(0);
        this.avatar_mask.scaleX = this.avatar_mask.scaleY;
        this.avatar_mask.setOrigin(0.5, 0.8)

        this.nameText = this.scene.add.text(
            0,
            - (game.config.height / 42).toFixed(0),
            config.name,
            {
                fontFamily: 'lalezar',
                fontSize: game.config.width / 25,
                rtl: true,
                align: 'center',
                color: '#B6B0CE'
            }
        );
        this.nameText.setOrigin(0.5, 0.5);
        this.add(this.nameText)

        this.progress_bg = this.scene.add.nineslice(
            0,
            this.width * 0.05,
            this.width,
            20,
            'progress_bg',
            20,
            0
        )

        this.progress_fill = this.scene.add.nineslice(
            0,
            this.width * 0.05,
            this.width,
            20,
            'progress_fill',
            20,
            0
        )
        this.progress_bg.setOrigin(0.5,0.5)
        this.progress_fill.setOrigin(0.5,0.5)
        this.add(this.progress_bg)
        this.add(this.progress_fill)
        this.scene.add.existing(this);

        emitter.on(G.TIMER, this.onTimeUpdated, this)
        emitter.on(G.EVENT_NEW_ROUND, this.newRound, this)
        // emitter.on("change", this.newRound, this)
        // socket.on("backgommon_new_round", this.newRound.bind(this), this)
    }

    newRound(game) {
        console.log(model.turn+" "+this.client_id)
        if (model.turn === this.client_id) {
            this.progress_bg.setVisible(true)
            this.progress_fill.setVisible(true)
        } else {
            this.progress_bg.setVisible(false)
            this.progress_fill.setVisible(false)
        }

    }

    onTimeUpdated() {
        this.setProgress()
    }

    setProgress() {
        let max = model.round_time ?? 5;
        let percent = model.seconds / max

        let max_width = this.width

        this.progress_fill.resize((max_width * percent), 0)
    }
}
