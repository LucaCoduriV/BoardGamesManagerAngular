import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"]
})
export class SidebarComponent implements OnInit {
    constructor(private auth: UserService) {}

    ngOnInit() {
        console.log(this.auth.getUserInfos);
    }

    get superadmin() {
        return localStorage.getItem("superadmin");
    }
}
