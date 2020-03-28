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
    /**
     * Permet de savoir si l'utilisateur est authentifié
     */
    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token) return true;
        return false;
    }
    /**
     * permet d'avoir les infos d'un utilisateur
     */
    getUserInfos() {
        const decode: Token = jwt_decode(localStorage.getItem("token"));
        return decode;
    }
    /**
     * Permet de récupérer un token
     * @param username le nom d'utilisateur
     * @param password le mot de passe
     * @param callback callback
     */
    login(username: string, password: string, callback) {
        let alert: Alert;

        this.postService.getToken(username, password).subscribe(
            data => {
                localStorage.setItem("token", data["token"]);
                this.decodedToken = this.getUserInfos();
                localStorage.setItem("idUser", this.decodedToken.idUser + "");
                localStorage.setItem("username", this.decodedToken.username + ""); // prettier-ignore
                localStorage.setItem("superadmin", this.decodedToken.superadmin +""); // prettier-ignore
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
    /**
     * permet de supprimmer le token et ainsi déconnecter l'utilisateur
     */
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
    /**
     * Permet d'enregistrer un utilisateur
     * @param username nom d'utilisateur
     * @param password mot de passe
     * @param callback callback
     */
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
    /**
     * Permet de récupérer les utilisateurs
     * @param callback callback
     */
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
    /**
     * Permet de supprimmer un utilisateur
     * @param idUser id de l'utilisateur à supprimmer
     * @param callback callback
     */
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
