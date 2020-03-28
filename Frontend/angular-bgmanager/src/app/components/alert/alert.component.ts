import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-alert",
    templateUrl: "./alert.component.html",
    styleUrls: ["./alert.component.scss"]
})
export class AlertComponent implements OnInit {
    constructor(private alertService: AlertService) {}

    ngOnInit() {}
    /**
     * permet de fermer l'affichage de l'alert
     */
    close() {
        this.alertService.showAlert(false);
    }
}
