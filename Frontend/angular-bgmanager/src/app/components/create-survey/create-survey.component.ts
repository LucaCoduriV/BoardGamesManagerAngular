import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GetService } from "src/app/services/http-requests/get.service";
import { Observable } from "rxjs";

@Component({
    selector: "app-create-survey",
    templateUrl: "./create-survey.component.html",
    styleUrls: ["./create-survey.component.scss"]
})
export class CreateSurveyComponent implements OnInit {
    gamelist$: Observable<any>;
    selectedCollectionGame: number;
    listOfSelectedGames: Array<any> = [];
    usersCollection: Array<any>;

    createSurveyForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });

    constructor(private getService: GetService) {}

    ngOnInit() {
        this.gamelist$ = this.getService.getUserCollection(
            +localStorage.getItem("idUser")
        );
        this.gamelist$.subscribe(value => {
            this.usersCollection = value;
        });
    }
    onSelectChange(value: string) {
        this.selectedCollectionGame = +value;
    }

    addCollectionGameInList() {
        this.listOfSelectedGames.push(
            this.usersCollection.find(
                value => this.selectedCollectionGame == value.idGame
            )
        );
    }
    removeGame(id: number) {
        this.listOfSelectedGames = this.listOfSelectedGames.filter(element => {
            return element.idGame != +id;
        });
    }
}
