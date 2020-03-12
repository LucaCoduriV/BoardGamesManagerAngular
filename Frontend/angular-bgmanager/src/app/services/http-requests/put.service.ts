import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { retry, catchError } from "rxjs/operators";
import { ErrorsHandler } from "../errorsHandler.service";

@Injectable({
    providedIn: "root"
})
export class PutService {
    constructor(
        private http: HttpClient,
        private errorsHandler: ErrorsHandler
    ) {}

    modifyGame(
        idUser,
        {
            gameName,
            description,
            minAge,
            minNbPlayer,
            maxNbPlayer,
            duration,
            creationDate,
            image
        }
    ) {
        const urlModifyGame: string = `localhost:8081/users/0/games/${idUser}`;

        let body = {
            gameName: gameName,
            description: description,
            minAge: minAge,
            minNbPlayer: minNbPlayer,
            maxNbPlayer: maxNbPlayer,
            duration: duration,
            creationDate: creationDate,
            image: image
        };
        return this.http
            .put(urlModifyGame, body, { responseType: "text" })
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }
}
