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
    /**
     * lors du changement du select
     * @param value récupère la valeur lors d'un changement du select
     */
    onSelectChange(value: string) {
        this.selectedCollectionGame = +value;
    }
    /**
     * lors du clique sur le bouton pour ajouter un jeu à la liste
     */
    addCollectionGameInList() {
        this.listOfSelectedGames.push(
            this.usersCollection.find(
                value => this.selectedCollectionGame == value.idGame
            )
        );
    }
    /**
     * permet de supprimer un jeu de la liste
     * @param id id du jeu à retirer de la liste
     */
    removeGame(id: number) {
        this.listOfSelectedGames = this.listOfSelectedGames.filter(element => {
            return element.idGame != +id;
        });
    }
    /**
     * lors de du clique sur le bouton de confirmation de création de sondage
     */
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
