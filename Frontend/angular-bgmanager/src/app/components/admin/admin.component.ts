import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
    usersList: Array<any>;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.getUsers();
    }

    getUsers() {
        this.userService.getUsers((err, result) => {
            if (err) console.log(err);
            else this.usersList = result;
            console.log(this.usersList);
        });
    }
}
