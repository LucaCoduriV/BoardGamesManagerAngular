import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-survey",
    templateUrl: "./survey.component.html",
    styleUrls: ["./survey.component.scss"]
})
export class SurveyComponent implements OnInit {
    surveyForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });
    constructor() {}

    ngOnInit() {}
}
