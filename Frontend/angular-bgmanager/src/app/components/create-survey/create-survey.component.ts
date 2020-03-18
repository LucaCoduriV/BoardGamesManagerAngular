import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GetService } from "src/app/services/http-requests/get.service";
import { Observable } from "rxjs";
import { PostService } from "src/app/services/http-requests/post.service";
import { Router } from "@angular/router";
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

    constructor(
        private getService: GetService,
        private postService: PostService,
        private router: Router
    ) {}

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

    onSubmit() {
        const idUser = localStorage.getItem("idUser");
        this.postService.addSurvey(idUser, this.listOfSelectedGames).subscribe(
            value => {
                console.log(value);
                this.router.navigate([`/survey/${value["shareCode"]}`]);
            },
            error => {
                console.log(error);
            }
        );
    }
}
