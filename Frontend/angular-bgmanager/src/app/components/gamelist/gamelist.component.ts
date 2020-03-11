import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Observable } from "rxjs";
import { GameService } from "src/app/services/game.service";

@Component({
    selector: "app-gamelist",
    templateUrl: "./gamelist.component.html",
    styleUrls: ["./gamelist.component.scss"]
})
export class GamelistComponent implements OnInit {
    @Input() gameList$: Observable<any>;
    @Input() title: string = "";
    @Input() isCollection: boolean = false;

    constructor(private gameService: GameService) {}

    ngOnInit() {}

    selectGame(id: number, isCollection: boolean = false) {
        console.log(id);
        this.gameService.askGameDetails(id, isCollection);
    }

    selectCollectionGame() {}
}
