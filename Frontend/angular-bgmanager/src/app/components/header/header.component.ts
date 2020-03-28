import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    constructor(private auth: UserService) {}

    ngOnInit() {}
    /**
     * lors du clique sur le bouton de déconnection
     */
    disconnect() {
        this.auth.disconnect();
    }
    /**
     * récupère le nom d'utilisateur actuellement connecté
     */
    get getUsername() {
        return localStorage.getItem("username");
    }
}
