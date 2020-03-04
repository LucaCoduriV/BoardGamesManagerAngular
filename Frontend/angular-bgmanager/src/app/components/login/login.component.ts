import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Alert } from "src/app/objects/alert";
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

    alert: Alert;
    isAlertVisible: boolean = false;

    constructor(private auth: AuthService) {}

    ngOnInit() {}

    onSubmit() {
        const username = this.loginForm.value.username;
        const password = this.loginForm.value.password;

        if (username != "" && password != "") {
            this.isAlertVisible = false;
            this.login(username, password);
        } else {
            this.alert = {
                type: "danger",
                message: "Un ou plusieurs champs sont vides"
            };
            this.isAlertVisible = true;
        }
    }

    close() {
        this.isAlertVisible = false;
    }

    login(username, password) {
        this.auth.login(username, password).subscribe(
            data => {
                localStorage.setItem("token", data["token"]);
            },
            error => {
                if (error.code == 401) {
                    this.alert = {
                        type: "danger",
                        message: "Mauvais mot de passe ou utilisateur"
                    };
                    this.isAlertVisible = true;
                }

                console.log("Erreur: " + error.message);
            }
        );
    }
}
