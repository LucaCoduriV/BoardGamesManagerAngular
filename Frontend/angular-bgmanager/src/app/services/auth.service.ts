import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class AuthService {
    url: string = "http://localhost:8081/login";

    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http.post(this.url, {
            username: username,
            password: password
        });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem("token");

        if (token) return true;
        return false;
    }
}
