class SceneWaiting extends Phaser.Scene {
  constructor() {
    super('SceneWaiting');
  }

  preload() { }

  create() {
    // ======================================= TEST
    controller = new Controller();
    return


    setTimeout(() => {

        controller = new Controller();
        console.log("creating battle...")
        socket.emit("create_battle", JSON.stringify({
          type: 1, game_id: 9, entry_coin: 20,
        }))

        socket.on(G.JOINED, (json) => {
          console.log("create battle successfully")
          let values = JSON.parse(json)
          console.log(values)
          client.id = values.creator_client_id
          battle._id = values._id
          opponent.id = JSON.parse(json).client_ids[1]
          socket.emit(G.EVENT_READY, {
            battle_id: battle._id
          })
        })

    }, 3000)

    return

    this.aGrid = new AlignGrid({
      scene: this,
      rows: 5,
      cols: 5
    });

    this.waitingText = this.add.text(
      0,
      0,
      "منتظر رقیبیم ...",
      {
        fontFamily: 'lalezar',
        fontSize: game.config.width / 14,
        rtl: true,
        align: 'center',
        color: '#FFFFFF',

      }
    )

    this.waitingText.setOrigin(0.5, 0.5)
    this.aGrid.placeAtIndex(12, this.waitingText)
    Align.scaleToGameW(this.waitingText, 0.5)

    if (socket && socket.connected) {
      console.log('already connected')
      if (!has_submitted_ready) {

        if (controller == null) {
          controller = new Controller();
        }
        setTimeout(
          function () {
            console.log('sending ready ' + client.id)
            socket.emit(G.EVENT_READY, {
              battle_id: battle._id
            });
            has_submitted_ready = true
          }, 5000);
      }
    } else {
      console.log('not connected yet')
      socket.on('connect', () => {
        if (!has_submitted_ready) {
          console.log('connected in listener')

          if (controller == null) {
            console.log('initializing controller')
            controller = new Controller();
          }
          setTimeout(
            function () {
              console.log('sending ready')
              socket.emit(G.EVENT_READY, {
                battle_id: battle._id
              }
              );
              has_submitted_ready = true
            }, 5000);

        }
      });
    }


  }

  update() { }
}
