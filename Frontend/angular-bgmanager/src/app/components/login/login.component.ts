import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Alert } from "src/app/objects/alert";
import { AlertService } from "src/app/services/alert.service";
import { Router } from "@angular/router";
@Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
    loginForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });

    constructor(
        private auth: UserService,
        private alertService: AlertService,
        private router: Router
    ) {}

    ngOnInit() {}

    onSubmit() {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        if (username != "" && password != "") {
            this.alertService.showAlert(false);
            this.login(username, password);
        } else {
            this.alertService.modifyAlert(
                "danger",
                "Un ou plusieurs champs sont vides"
            );
            this.alertService.showAlert(true);
        }
    }
    /**
     * permet de récupérer le token
     * @param username nom d'utilisateur
     * @param password mot de passe
     */
    login(username, password) {
        this.auth.login(username, password, (alert: Alert) => {
            if (alert) {
                this.alertService.modifyAlert(alert.type, alert.message);

                this.alertService.showAlert(true);
            } else {
                this.alertService.modifyAlert("success", "Vous êtes connecté");
                this.alertService.showAlert(true);
                this.router.navigate(["/collection"]);
            }
        });
    }
}
