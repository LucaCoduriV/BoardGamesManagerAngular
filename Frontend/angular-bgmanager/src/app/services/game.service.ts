import { Injectable } from "@angular/core";
import { GetService } from "./http-requests/get.service";
import { of, Subject, Observable, EMPTY } from "rxjs";
import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
    startWith,
    finalize
} from "rxjs/operators";
import { PostService } from "./http-requests/post.service";
import { Game } from "../objects/game";

@Injectable({
    providedIn: "root"
})
export class GameService {
    //details
    private gameDetailsSubject$: Subject<void> = new Subject();
    detailedGameID: number;
    detailedGameData: Object;
    isLoadingDetails: boolean = false;

    //search
    isLoadingSearch: boolean = false;

    //collection
    collectionData: Object;
    addGamePlaceHolder: Game;

    constructor(
        private getService: GetService,
        private postService: PostService
    ) {
        this.createGameDetailsSubject();
    }

    getBGGSearchResult(gameName, callback) {
        this.isLoadingSearch = true;
        this.getService
            .searchGameBGG(gameName)
            .pipe(
                finalize(() => {
                    //Quand le chargement est terminé
                    this.isLoadingSearch = false;
                })
            )
            .subscribe(
                data => {
                    callback(data);
                },
                error => {
                    console.log(error);
                }
            );
    }

    //récupère les données et les met à disposition
    askGameDetails(id: number) {
        this.detailedGameID = id;
        this.gameDetailsSubject$.next();
    }

    //un Subject est crée avec un switchmap afin d'éviter de charger des données dont l'utilisateur n'a plus besoin
    //à chaque fois que le Subject est appelé l'ancienne demande est supprimée
    createGameDetailsSubject() {
        this.gameDetailsSubject$
            .pipe(
                switchMap(() => {
                    this.isLoadingDetails = true;
                    if (this.detailedGameID)
                        return this.getService
                            .getGameDetail(this.detailedGameID)
                            .pipe(
                                finalize(() => {
                                    //Quand le chargement est terminé
                                    this.isLoadingDetails = false;
                                })
                            );
                    else return EMPTY;
                })
            )
            .subscribe(
                data => {
                    //remplace tous les retour à la ligne codé en ISO-5809-1 avant de les transmettre plus loin
                    data["item"].description = data["item"].description.replace(
                        new RegExp("&#10;", "g"),
                        "<br>"
                    );
                    this.detailedGameData = data;
                },
                error => {
                    console.log(error);
                }
            );
    }

    getUserCollection(id: number) {
        this.getService.getUserCollection(id).subscribe(
            data => {
                this.collectionData = data;
            },
            error => {
                console.log(error);
            }
        );
    }

    addGame({ name, minPlayer, maxPlayer, duration, description }, callback) {
        this.postService
            .addGame({
                name,
                minPlayer,
                maxPlayer,
                duration,
                description
            })
            .subscribe(
                result => {
                    callback(undefined, result);
                },
                error => {
                    callback(error);
                }
            );
    }
}
