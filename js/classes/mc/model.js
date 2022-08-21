class Model
{
	constructor() {
		this.turn = 6992
		this.game_type = "dice"
		this.locked = false
		this.leading_client_id = 6992
		this.round_time = 40
		this.seconds = 0
		this._seconds = 0
	}

	set seconds(val) {
		this._seconds = val;
		emitter.emit(G.TIMER);
	}

	get seconds() {
		return this._seconds;
	}
}