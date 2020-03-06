import { Component, OnInit, Input, OnChanges } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-gamelist",
    templateUrl: "./gamelist.component.html",
    styleUrls: ["./gamelist.component.scss"]
})
export class GamelistComponent implements OnInit {
    @Input() gameList$: Observable<any>;
    @Input() title: string = "";

    constructor() {}

    ngOnInit() {}
}
