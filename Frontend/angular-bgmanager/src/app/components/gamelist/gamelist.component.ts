import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Observable } from "rxjs";
import { GameDetailsService } from "src/app/services/game-details.service";

@Component({
    selector: "app-gamelist",
    templateUrl: "./gamelist.component.html",
    styleUrls: ["./gamelist.component.scss"]
})
export class GamelistComponent implements OnInit {
    @Input() gameList$: Observable<any>;
    @Input() title: string = "";

    constructor(private gameDetailsService: GameDetailsService) {}

    ngOnInit() {}

    selectGame(id: number) {
        console.log(id);
        this.gameDetailsService.setGame(id);
    }
}
