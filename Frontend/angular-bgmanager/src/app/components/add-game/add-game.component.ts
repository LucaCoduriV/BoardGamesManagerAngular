import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { GameService } from "src/app/services/game.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-add-game",
    templateUrl: "./add-game.component.html",
    styleUrls: ["./add-game.component.scss"]
})
export class AddGameComponent implements OnInit {
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

    onSubmit() {
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
        if (this.gameService.isEdit) {
        }
    }
}
