import { Component, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { GameService } from "src/app/services/game.service";

@Component({
    selector: "app-game-details",
    templateUrl: "./game-details.component.html",
    styleUrls: ["./game-details.component.scss"]
})
export class GameDetailsComponent implements OnInit {
    //TODO supprimer l'erreur avant au premier chargement du composent
    placeholder =
        "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png";

    constructor(private gameService: GameService) {}

    ngOnInit() {}

    //TODO supprimer cette fonction de test
    test() {
        console.log(this.gameService.detailedGameData);
    }
}
