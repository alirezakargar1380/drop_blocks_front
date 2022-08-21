class ScoreBox extends Phaser.GameObjects.Container {
  constructor(config) {
    super(config.scene);

    this.scene = config.scene;
    this.width = game.config.width
    this.box = this.scene.add.image(
        0,
        0,
        'score_box'
    )
    this.add(this.box)
    Align.scaleToGameW(this.box, 0.8)


    this.myscore = this.scene.add.text(
        this.box.x + this.box.displayWidth / 4.5,
        0,
        "امتیاز شما: ۰",
        {
          fontFamily: 'lalezar',
          fontSize: game.config.width / 22,
          rtl: true,
          align: 'center',
          color: '#FFFFFF',

        }
    )
    this.myscore.setOrigin(0.5, 0.5)
    this.add(this.myscore)


    this.opponentScore = this.scene.add.text(
        this.box.x - this.box.displayWidth / 4.5,
        0,
        "امتیاز حریف: ۰",
        {
          fontFamily: 'lalezar',
          fontSize: game.config.width / 22,
          rtl: false,
          align: 'center',
          color: '#FFFFFF',

        }
    )
    this.opponentScore.setOrigin(0.5, 0.5)
    this.add(this.opponentScore)


    emitter.on(G.EVENT_QUESTION_RESULT, this.questionResultRecieved, this)

    this.scene.add.existing(this);
  }

  questionResultRecieved() {
    // return console.log(model.results)
    //   console.log('updating scores ' + JSON.stringify(model.results))
    // console.log(model.leading_client_id)
    // console.log('results lenght = ' + model.results.length)
    for (let i = 0; i < model.results.length; i++) {
      let result = model.results[i]
      if (result.client_id === client.id) {
        // console.log('setting my score to ' + "امتیاز شما: " + result.score)
        this.myscore.setText(
            PersianNumUtil.toPersianNum(
                "امتیاز شما: " + result.score +
                (model.leading_client_id === client.id ? " 👑" : "")
            )
        )
      } else {
        // console.log('setting opponent score to ' + "امتیاز حریف: " + result.score)
        this.opponentScore.setText(
            PersianNumUtil.toPersianNum(
                "امتیاز حریف: " + result.score +
                (model.leading_client_id === client.id ? "" : " 👑")
            )
        )
      }
    }
  }

}