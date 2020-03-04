import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { ErrorsHandler } from "./errorsHandler.service";
import { User } from "../objects/user";
import { PostService } from "./http-requests/post.service";
import { Alert } from "../objects/alert";
import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    private loginUrl: string = "http://localhost:8081/login";
    private registerUrl: string = "http://localhost:8081/users";

    public currentUser = { username: "", password: "", isSuperadmin: 0 };
    public isLogged = false;

    constructor(
        private http: HttpClient,
        private errorsHandler: ErrorsHandler,
        private postService: PostService
    ) {}

    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token) return true;
        return false;
    }

    getUserInfos(): User {
        const decode = jwt_decode(localStorage.getItem("token"));
        return decode;
    }

    login(username: string, password: string, callback) {
        let alert: Alert;

        this.postService.getToken(username, password).subscribe(
            data => {
                localStorage.setItem("token", data["token"]);
                this.currentUser.username = this.getUserInfos().username;
                this.isLogged = true;
                callback();
            },
            error => {
                alert = {
                    message: error.message,
                    type: error.type
                };
                callback(alert);
            }
        );
    }

    disconnect() {
        const token = localStorage.getItem("token");
        if (token) localStorage.removeItem("token");
        for (let key in this.currentUser) {
            if (this.currentUser.hasOwnProperty(key)) {
                this.currentUser[key] = null;
            }
        }
        this.isLogged = false;
    }

    register(username: string, password: string, callback) {
        let alert: Alert;

        this.postService.register(username, password).subscribe(
            data => {
                alert = {
                    type: "success",
                    message: "Vous vous êtes bien inscrit"
                };
                callback(alert);
            },
            error => {
                alert = {
                    type: "danger",
                    message: error.message
                };
                callback(alert);
            }
        );
    }
}
