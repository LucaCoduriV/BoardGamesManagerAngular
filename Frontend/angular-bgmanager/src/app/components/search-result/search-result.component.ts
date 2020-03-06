import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { GetService } from "src/app/services/http-requests/get.service";

@Component({
    selector: "app-search-result",
    templateUrl: "./search-result.component.html",
    styleUrls: ["./search-result.component.scss"]
})
export class SearchResultComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private getService: GetService
    ) {}

    searchString: string = "";
    gameResults$: Observable<any>;

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.searchString = params.get("searchstring");
            this.gameResults$ = this.getService.searchGameBGG(
                this.searchString,
                false
            );
        });
    }
}
