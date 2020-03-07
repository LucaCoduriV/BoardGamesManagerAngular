import { Injectable } from "@angular/core";
import { GetService } from "./http-requests/get.service";
import { of, Subject, Observable, EMPTY } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class GameService {
    private gameDetailsSubject$: Subject<void> = new Subject();
    detailedGameID: number;
    detailedGameData: Object;

    constructor(private getService: GetService) {
        //un Subject est crée avec un switchmap afin d'éviter de charger des données dont l'utilisateur n'a plus besoin
        //à chaque fois que le Subject est appelé l'ancienne demande est supprimée
        this.getBGGGameDetails();
    }

    getBGGSearchResult(gameName, callback) {
        this.getService.searchGameBGG(gameName).subscribe(
            data => {
                callback(data);
            },
            error => {
                console.log(error);
            }
        );
    }

    askGameDetails(id: number) {
        this.detailedGameID = id;
        this.gameDetailsSubject$.next();
    }

    getBGGGameDetails() {
        this.gameDetailsSubject$
            .pipe(
                switchMap(() => {
                    if (this.detailedGameID)
                        return this.getService.getGameDetail(
                            this.detailedGameID
                        );
                    else return EMPTY;
                })
            )
            .subscribe(
                data => {
                    this.detailedGameData = data;
                },
                error => {
                    console.log(error);
                }
            );
    }
}
