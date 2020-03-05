import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "src/app/services/user.service";
import { Alert } from "src/app/objects/alert";

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

    alert: Alert;
    isAlertVisible: boolean = false;

    constructor(private authService: UserService) {}

    ngOnInit() {}

    close() {
        this.isAlertVisible = false;
    }

    register() {
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;

        this.authService.register(username, password, alert => {
            if (alert) {
                this.alert = {
                    message: alert.message,
                    type: alert.type
                };
                this.isAlertVisible = true;
            } else {
                this.isAlertVisible = false;
            }
        });
    }

    onSubmit() {
        this.register();
    }
}
