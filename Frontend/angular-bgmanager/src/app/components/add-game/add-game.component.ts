import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GameService } from "src/app/services/game.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-add-game",
    templateUrl: "./add-game.component.html",
    styleUrls: ["./add-game.component.scss"]
})
export class AddGameComponent implements OnInit, OnDestroy {
    addGameForm = new FormGroup({
        name: new FormControl(""),
        creationDate: new FormControl(""),
        minNbPlayer: new FormControl(""),
        maxNbPlayer: new FormControl(""),
        duration: new FormControl(""),
        description: new FormControl(""),
        image: new FormControl("")
    });

    constructor(
        private gameService: GameService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        if (this.gameService.addGamePlaceHolder) {
            this.addGameForm.patchValue(this.gameService.addGamePlaceHolder);
        }
    }

    ngOnDestroy() {
        this.gameService.isEdit = false;
        this.gameService.addGamePlaceHolder = null;
    }
    /**
     * S'execute lors du click sur le bouton
     */
    onSubmit() {
        //s'il s'agit d'ajouter un jeu à la collection
        if (!this.gameService.isEdit) {
            this.gameService.addGame(this.addGameForm.value, (err, result) => {
                if (err) {
                    this.alertService.modifyAlert(
                        "danger",
                        "Impossible d'ajouter le jeu"
                    );
                    console.log(err);
                }
                if (result) {
                    this.alertService.modifyAlert("success", result);
                    this.alertService.showAlert(true);
                }
            });
        }
        //s'il s'agit de modifier un jeu de la collection
        if (this.gameService.isEdit) {
            let data = {
                gameName: this.addGameForm.value.name,
                description: this.addGameForm.value.description,
                minAge: 0,
                minNbPlayer: this.addGameForm.value.minNbPlayer,
                maxNbPlayer: this.addGameForm.value.maxNbPlayer,
                duration: this.addGameForm.value.duration,
                creationDate: this.addGameForm.value.creationDate,
                image: this.addGameForm.value.image
            };

            this.gameService.editGame(this.gameService.idGameToEdit, data);
        }
    }
}
