import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Alert } from "src/app/objects/alert";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
    registerForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });

    constructor(
        private authService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {}

    close() {
        this.alertService.showAlert(false);
    }

    register() {
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;

        this.authService.register(username, password, alert => {
            if (alert) {
                this.alertService.modifyAlert(alert.type, alert.message);
                this.alertService.showAlert(true);
            } else {
                this.alertService.showAlert(false);
            }
        });
    }

    onSubmit() {
        this.register();
    }
}
