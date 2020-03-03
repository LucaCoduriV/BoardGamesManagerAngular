import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
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
    constructor(private auth: AuthService) {}

    ngOnInit() {}

    onSubmit() {
        this.login(
            this.loginForm.value.username,
            this.loginForm.value.password
        );
    }

    login(username, password) {
        this.auth.login(username, password).subscribe(data => {
            console.log(data);
        });
    }
}
