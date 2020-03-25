import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { ErrorsHandler } from "../errorsHandler.service";

@Injectable({
    providedIn: "root"
})
export class DeleteService {
    deleteUrl = "http://localhost:8081/users/";

    constructor(
        private http: HttpClient,
        private errorsHandler: ErrorsHandler
    ) {}

    deleteUser(idUser) {
        const url = `${this.deleteUrl}${idUser}`;

        return this.http
            .delete(url, { responseType: "text" })
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    deleteGame(idGame) {
        const url = `http://localhost:8081/users/0/games/${idGame}`;
        return this.http
            .delete(url)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }
}
