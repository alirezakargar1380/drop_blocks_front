class SceneLoad extends Phaser.Scene {

    constructor() {
        super('SceneLoad');
    }

    preload() {
        this.load.image("progress_bg", "images/progress_bg.png");
        this.load.image("progress_fill", "images/progress_fill.png");
        this.load.image("avatar_mask", "images/avatar_mask.png");
        this.load.image("score_box", "images/score_box.png");
        this.load.image("avatar_placeholder", "images/avatar_placeholder.png");
        this.load.image("my_avatar", my_avatar_url);
        this.load.image("opponent_avatar", opponent_avatar_url);

        // Game images
        this.load.image("board", "images/chess_board.png")

        // white Nut
        this.load.image("white_soldier_nut", "images/white_soldier_nut.png")
        this.load.image("white_castle_nut", "images/white_castle_nut.png")
        this.load.image("white_horse_nut", "images/white_horse_nut.png")
        this.load.image("white_elephant_nut", "images/white_elephant_nut.png")
        this.load.image("white_minister_nut", "images/white_minister_nut.png")
        this.load.image("white_king_nut", "images/white_king_nut.png")

        // black Nut
        this.load.image("black_soldier_nut", "images/black_soldier_nut.png")
        this.load.image("black_castle_nut", "images/black_castle_nut.png")
        this.load.image("black_horse_nut", "images/black_horse_nut.png")
        this.load.image("black_elephant_nut", "images/black_elephant_nut.png")
        this.load.image("black_minister_nut", "images/black_minister_nut.png")
        this.load.image("black_king_nut", "images/black_king_nut.png")

        // selected
        this.load.image("soldier_nut_selected", "images/soldier_nut_selected.png")
        this.load.image("minister_nut_selected", "images/minister_nut_selected.png")
        this.load.image("castle_nut_selected", "images/castle_nut_selected.png")
        this.load.image("elephant_nut_selected", "images/elephant_nut_selected.png")
        this.load.image("king_nut_selected", "images/king_nut_selected.png")
        this.load.image("check_king_nut_selected", "images/check_king_nut_selected.png")
        this.load.image("horse_nut_selected", "images/horse_nut_selected.png")
        this.load.image("selected_home", "images/selected_home.png")
        this.load.image("selected_home_preview", "images/selected_home_preview.png")
    }

    create() {
        // this.scene.start("SceneWaiting");
        this.scene.start("SceneChessBoard");
        // socket.on("bla", () => {
        //     console.log("helo")
        // })
        // ============================== TEST
        // if (socket && socket.connected) {
        //     console.log('already connected')
        //     if (controller == null) {
        //         controller = new Controller();
        //     } else {
        //         controller = new Controller();
        //     }
        // } else {
        //     socket.on('connect', () => {
        //         console.log("sadfasd")
        //     })
        // }

        // ============================== TEST

    }

}