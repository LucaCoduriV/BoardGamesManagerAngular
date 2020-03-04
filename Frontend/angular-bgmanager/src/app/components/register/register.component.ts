import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
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

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    register() {
        const username = this.registerForm.value.username;
        const password = this.registerForm.value.password;

        this.authService.register(username, password).subscribe(
            data => {},
            error => {
                this.alert = {
                    type: "danger",
                    message: error.message
                };
                this.isAlertVisible = true;
            }
        );
    }

    onSubmit() {
        this.register();
    }
}
