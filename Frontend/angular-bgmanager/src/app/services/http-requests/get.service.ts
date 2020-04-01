import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ErrorsHandler } from "../errorsHandler.service";
import { retry, catchError, filter, map } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class GetService {
    private searchUrl: string = "http://localhost:8081/BGG/games/";
    private getUsersUrl: string = "http://localhost:8081/users";

    constructor(
        private http: HttpClient,
        private errorsHandler: ErrorsHandler
    ) {}

    getGameDetail(id: number) {
        let gameDetailUrl: string = `http://localhost:8081/BGG/games/${id}/details`;
        return this.http
            .get(gameDetailUrl)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    searchGameBGG(gameName: string, slice: boolean = true, numberResult = 3) {
        gameName = gameName.replace(" ", "%20");
        console.log(gameName);
        let regex = new RegExp(`^${gameName}.*`, "i"); //ce regex permet de ne chercher que ce qui commence par le gameName
        return this.http.get(this.searchUrl + gameName).pipe(
            retry(3),
            catchError(this.errorsHandler.handleError),
            map(result => {
                console.log(result);
                if (result["item"] != undefined) {
                    let newResult = result["item"].filter(item =>
                        regex.test(item.name.value)
                    );
                    if (slice) {
                        return newResult.slice(0, numberResult); //ne donne que les 3 premières valeurs du tableau
                    }
                    return newResult;
                }
                console.log([{ item: { name: { value: "No game found" } } }]);
                return [{ name: { value: "No game found" } }];
            })
        );
    }

    getUsers() {
        return this.http
            .get(this.getUsersUrl)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    getUserCollection(id: number) {
        const userCollectionUrl: string = `http://localhost:8081/users/${id}/games`;

        return this.http
            .get(userCollectionUrl)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    getUserGameDetails(idGame: number) {
        const userGameDetails: string = `http://localhost:8081/users/0/games/${idGame}`;
        return this.http
            .get(userGameDetails)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    getSurvey(shareCode: string) {
        return this.http
            .get(`http://localhost:8081/users/surveys/${shareCode}`)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    getCandidates(idSurvey: number) {
        return this.http
            .get<Array<Object>>(
                `http://localhost:8081/users/surveys/${idSurvey}/candidates`
            )
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }

    getVoteStatus(idSurvey) {
        return this.http
            .get(`http://localhost:8081/surveys/${idSurvey}/hasVoted`)
            .pipe(retry(3), catchError(this.errorsHandler.handleError));
    }
}
