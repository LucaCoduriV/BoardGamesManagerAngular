import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Alert } from "src/app/objects/alert";
import { AlertService } from "src/app/services/alert.service";
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
        private alertService: AlertService
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

    login(username, password) {
        this.auth.login(username, password, (alert: Alert) => {
            if (alert) {
                this.alertService.modifyAlert(alert.type, alert.message);

                this.alertService.showAlert(false);
            } else {
                this.alertService.showAlert(true);
            }
        });
    }
}
