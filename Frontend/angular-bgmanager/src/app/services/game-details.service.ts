import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class GameDetailsService {
    private _game: Object;
    constructor() {}

    get game() {
        return this._game;
    }

    setGame() {}
}
