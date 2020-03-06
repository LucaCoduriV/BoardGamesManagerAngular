import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
})
export class AuthGuardService implements CanActivate {
    constructor(public auth: UserService, public router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(["login"]);
            return false;
        }
        return true;
    }
}
@Injectable({
    providedIn: "root"
})
export class AdminGuardService implements CanActivate {
    constructor(public auth: UserService, public router: Router) {}
    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(["login"]);
            return false;
        } else if (this.auth.getUserInfos().superadmin == 0) {
            return false;
        }
        return true;
    }
}
