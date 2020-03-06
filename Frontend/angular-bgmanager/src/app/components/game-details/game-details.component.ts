import { Component, OnInit, OnChanges } from "@angular/core";
import { GameDetailsService } from "src/app/services/game-details.service";

@Component({
    selector: "app-game-details",
    templateUrl: "./game-details.component.html",
    styleUrls: ["./game-details.component.scss"]
})
export class GameDetailsComponent implements OnInit {
    constructor(private gameDetailsService: GameDetailsService) {}

    ngOnInit() {}
}
