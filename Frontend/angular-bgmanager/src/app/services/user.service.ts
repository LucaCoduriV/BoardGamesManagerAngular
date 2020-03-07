import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ErrorsHandler } from "./errorsHandler.service";
import { PostService } from "./http-requests/post.service";
import { Alert } from "../objects/alert";
import * as jwt_decode from "jwt-decode";
import { Token } from "../objects/token";
import { GetService } from "./http-requests/get.service";
import { DeleteService } from "./http-requests/delete.service";

@Injectable({
    providedIn: "root"
})
export class UserService {
    public decodedToken: Token;
    public isLogged = false;

    constructor(
        private http: HttpClient,
        private errorsHandler: ErrorsHandler,
        private postService: PostService,
        private getService: GetService,
        private deleteService: DeleteService
    ) {}

    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token) return true;
        return false;
    }

    getUserInfos() {
        const decode: Token = jwt_decode(localStorage.getItem("token"));
        return decode;
    }

    login(username: string, password: string, callback) {
        let alert: Alert;

        this.postService.getToken(username, password).subscribe(
            data => {
                localStorage.setItem("token", data["token"]);
                this.decodedToken = this.getUserInfos();
                localStorage.setItem("idUser", this.decodedToken.idUser + "");
                localStorage.setItem("username", this.decodedToken.username + ""); // prettier-ignore
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
        for (let key in this.decodedToken) {
            if (this.decodedToken.hasOwnProperty(key)) {
                this.decodedToken[key] = null;
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

    getUsers(callback) {
        this.getService.getUsers().subscribe(
            data => {
                callback(undefined, data);
            },
            error => {
                callback(error);
            }
        );
    }
    deleteUser(idUser, callback) {
        this.deleteService.deleteUser(idUser).subscribe(
            data => {
                callback(undefined, data);
            },
            error => {
                callback(error);
            }
        );
    }
}
