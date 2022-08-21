class ProgressBox extends Phaser.GameObjects.Container {

    constructor(config) {
        super(config.scene);
        this.scene = config.scene;

        this.leftQuestionsText = this.scene.add.text(
            0,
            0,
            '',
            {
                fontFamily: 'lalezar',
                fontSize: game.config.width / 25,
                rtl: true,
                align: 'right',
                color: '#B6B0CE'
            }
        );
        this.leftQuestionsText.setOrigin(0.9, 1.2);
        this.add(this.leftQuestionsText)
        this.scene.aGrid.placeAtIndex(16, this.leftQuestionsText)


        this.progress_bg = this.scene.add.nineslice(
            0, 0,
            game.config.width / 2, 50,
            'progress_bg',
            25,
            0
        )
        this.progress_fill = this.scene.add.nineslice(
            0, 0,
            game.config.width / 2, 50,
            'progress_fill',
            25,
            0
        )


        this.scene.aGrid.placeAtIndex(11, this.progress_bg)
        this.scene.aGrid.placeAtIndex(11, this.progress_fill)


        this.timerText = this.scene.add.text(
            0,
            0,
            "۱۰ ثانیه",
            {
                fontFamily: 'lalezar',
                fontSize: game.config.width / 28,
                rtl: true,
                color: '#FFFFFF'
            }
        );
        this.add(this.timerText)
        this.timerText.setOrigin(0, 0.5);
        this.scene.aGrid.placeAtIndex(22, this.timerText)

        this.scene.add.existing(this);

        emitter.on(G.TIMER, this.onTimeUpdated, this)
        emitter.on(G.EVENT_NEW_QUESTION, this.newQuestion, this)
    }

    newQuestion() {
        this.leftQuestionsText.setText(
            PersianNumUtil.toPersianNum(
                model.remaining_questions === 0 ? "سوال آخر" : (model.remaining_questions ?? 0) + " سوال باقی مانده",
            )
        )
    }

    onTimeUpdated() {
        this.timerText.setText(
            PersianNumUtil.toPersianNum(
                model.seconds + " ثانیه"
            )
        )
        this.setProgress()
    }

    setProgress() {
        let max = model.question_time ?? 10;
        let percent = model.seconds / max

        let max_width = game.config.width / 2

        this.progress_fill.resize((max_width * percent), 50)
    }
}