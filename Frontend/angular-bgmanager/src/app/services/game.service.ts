import { Injectable } from "@angular/core";
import { GetService } from "./http-requests/get.service";
import { of, Subject, Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

@Injectable({
    providedIn: "root"
})
export class GameService {
    constructor(private getService: GetService) {}

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
}
