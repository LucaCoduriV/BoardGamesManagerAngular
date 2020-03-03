import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";

@Component({
    selector: "app-create-survey",
    templateUrl: "./create-survey.component.html",
    styleUrls: ["./create-survey.component.scss"]
})
export class CreateSurveyComponent implements OnInit {
    createSurveyForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });

    constructor() {}

    ngOnInit() {}
}
