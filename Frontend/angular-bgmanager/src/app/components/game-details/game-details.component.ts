import {
    Component,
    OnInit,
    OnChanges,
    SimpleChanges,
    Input
} from "@angular/core";
import { GameService } from "src/app/services/game.service";

@Component({
    selector: "app-game-details",
    templateUrl: "./game-details.component.html",
    styleUrls: ["./game-details.component.scss"]
})
export class GameDetailsComponent implements OnInit {
    @Input() isCollection: boolean = false;

    placeholder =
        "https://www.nomadfoods.com/wp-content/uploads/2018/08/placeholder-1-e1533569576673-960x960.png";

    replaceString: string;

    constructor(private gameService: GameService) {}

    ngOnInit() {}
}
