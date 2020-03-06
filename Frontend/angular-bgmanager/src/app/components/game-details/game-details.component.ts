import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { GameDetailsService } from "src/app/services/game-details.service";

@Component({
    selector: "app-game-details",
    templateUrl: "./game-details.component.html",
    styleUrls: ["./game-details.component.scss"]
})
export class GameDetailsComponent implements OnInit {
    private gameDetails;

    constructor(private gameDetailsService: GameDetailsService) {}

    ngOnInit() {
        this.gameDetails = this.gameDetailsService.game;
    }

    test() {
        console.log(this.gameDetailsService.game);
    }
}
