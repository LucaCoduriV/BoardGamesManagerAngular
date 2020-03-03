import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";

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

    constructor(private authService: AuthService) {}

    ngOnInit() {}

    register() {}
    onSubmit() {
        // TODO: Use EventEmitter with form value
        console.warn(this.registerForm.value);
    }
}
