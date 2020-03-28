import { Injectable } from "@angular/core";
import { HttpInterceptor } from "@angular/common/http";
import { mergeMap, switchMap } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable({
    providedIn: "root"
})
export class TokenInterceptorService implements HttpInterceptor {
    /**
     * permet d'ajouter le token dans le header à chaque requête vers l'API
     * @param req request
     * @param next callback
     */
    intercept(req, next) {
        // add authorization header with jwt token if available
        const token = localStorage.getItem("token");

        if (token) {
            req = req.clone({
                setHeaders: {
                    token: `${token}`
                }
            });
        }

        return next.handle(req);
    }
    constructor(private auth: UserService) {}
}
