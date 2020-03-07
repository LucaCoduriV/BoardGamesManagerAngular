import { Injectable } from "@angular/core";
import { GameService } from "./game.service";

@Injectable({
    providedIn: "root"
})
export class GameDetailsService {
    private _game: Object;
    constructor(private gameService: GameService) {}

    get game() {
        return this._game;
    }

    setGame(id: number) {
        // this.gameService.getBGGGameDetails(id, (err, result) => {
        //     if (err) console.log(err);
        //     else {
        //         console.log(result);
        //         this._game = result;
        //     }
        // });
    }
}
