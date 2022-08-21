var intervalID = null;
class Controller {
	constructor() {
		// ======================================= TEST
		// battle._id = "621cf5e9a981f031c8da2dac"
		// client.id = 6992
		// opponent.id = 5492
		// ======================================= TEST

		socket.on("chess_game_started", this.start_battle.bind(this))
		socket.on("chess_setup_piece", (json) => {
			model.turn = json.turn
			if (json.turn === client.id)
				model.locked = false
			else
				model.locked = true
			
			emitter.emit("setup_pieces", json.piece, json.directions, json.directions_type, json.colors, json.check_status)
		})
		socket.on("chess_move_piece", (json) => {
			model.turn = json.turn
			if (json.turn === client.id)
				model.locked = false
			else
				model.locked = true

			emitter.emit("move_piece", json.movement, json.piece, json.directions, json.directions_type, json.colors)
		})
		socket.on("chess_new_round", this.startTimer.bind(this))
	}

	start_battle() {
		if (game.scene.isActive('SceneWaiting'))
			game.scene.switch('SceneWaiting', 'SceneChessBoard')
	}

	startTimer(json) {
		emitter.emit(G.EVENT_NEW_ROUND)
		console.log(json.round_time)
		model.round_time = json.round_time
		let timeleft = model.round_time;
		model.seconds = timeleft
		if (intervalID !== "") {
			clearInterval(intervalID)
		}

		intervalID = setInterval(function () {

			if (timeleft <= 0) {
				clearInterval(intervalID);
				intervalID = ""
				return
			}
			timeleft -= 1;

			model.seconds = timeleft

		}, 1000);

	}
}