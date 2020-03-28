import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user.service";
import { AlertService } from "src/app/services/alert.service";

@Component({
    selector: "app-admin",
    templateUrl: "./admin.component.html",
    styleUrls: ["./admin.component.scss"]
})
export class AdminComponent implements OnInit {
    usersList: Array<any>;

    selectedUser: number;

    constructor(
        private userService: UserService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.getUsers();
    }
    /**
     * récupère les utilisateurs
     */
    getUsers() {
        this.userService.getUsers((err, result) => {
            if (err) console.log(err);
            else this.usersList = result;
            console.log(this.usersList);
        });
    }
    /**
     * S'execute lors d'un changement dans le select
     * @param value récupère la valeur selectionnée dans le select
     */
    onSelectChange(value) {
        console.log(value);
        this.selectedUser = parseInt(value);
    }
    /**
     * losr du clique sur le bouton pour supprimer un utilisateur
     */
    deleteUser() {
        this.userService.deleteUser(this.selectedUser, (err, result) => {
            if (err) {
                console.table(err);
                this.alertService.modifyAlert("danger", err.message);
                this.alertService.showAlert(true);
            } else {
                console.table(result);
                this.alertService.modifyAlert("success", result);
                this.alertService.showAlert(true);
                this.getUsers();
            }
        });
    }
}
