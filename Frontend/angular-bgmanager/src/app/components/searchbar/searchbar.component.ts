import { Component, OnInit } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { GameService } from "src/app/services/game.service";
import { GetService } from "src/app/services/http-requests/get.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-searchbar",
    templateUrl: "./searchbar.component.html",
    styleUrls: ["./searchbar.component.scss"]
})
export class SearchbarComponent implements OnInit {
    gamesResult$: Observable<any>;
    searchTextBGG$ = new Subject<string>();
    searchString: string;
    showHintbox: boolean = false;

    constructor(
        private gameService: GameService,
        private getService: GetService,
        private router: Router
    ) {}

    ngOnInit() {
        this.gamesResult$ = this.searchTextBGG$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(searchString => {
                if (searchString.length > 3) {
                    return this.getService.searchGameBGG(searchString);
                } else {
                    return of([null]);
                }
            })
        );
    }

    search(searchString: string) {
        this.searchString = searchString;
        this.searchTextBGG$.next(searchString);
    }

    onKeyUp(event) {
        if (event.key === "Enter") {
            this.showHintbox = false;
            this.router.navigate([`/search-result/${event.target.value}`]);
        } else {
            this.search(event.target.value);
        }
    }
}
