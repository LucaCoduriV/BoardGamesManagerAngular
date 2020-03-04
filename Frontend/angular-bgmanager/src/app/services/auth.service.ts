import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { errorsHandler } from "./errorsHandler.service";
import { User } from "../objects/user";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private loginUrl: string = "http://localhost:8081/login";
    private registerUrl: string = "http://localhost:8081/users";

    constructor(
        private http: HttpClient,
        private errorsHandler: errorsHandler
    ) {}

    login(username: string, password: string) {
        const user: User = {
            username: username,
            password: password
        };
        return this.http
            .post(this.loginUrl, user)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    disconnect() {
        const token = localStorage.getItem("token");
        if (token) localStorage.removeItem("token");
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token) return true;
        return false;
    }

    register(username: string, password: string) {
        const user: User = {
            username: username,
            password: password
        };
        return this.http
            .post(this.registerUrl, user)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }
}
