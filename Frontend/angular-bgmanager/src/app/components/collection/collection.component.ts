import { Component, OnInit } from "@angular/core";
import { GameService } from "src/app/services/game.service";
import { Observable } from "rxjs";
import { GetService } from "src/app/services/http-requests/get.service";

@Component({
    selector: "app-collection",
    templateUrl: "./collection.component.html",
    styleUrls: ["./collection.component.scss"]
})
export class CollectionComponent implements OnInit {
    currentUserId: number;
    collection$: Observable<any>;

    constructor(private gameService: GetService) {}

    ngOnInit() {
        this.currentUserId = +localStorage.getItem("idUser");

        this.gameService.getUserCollection(this.currentUserId);
    }
}
