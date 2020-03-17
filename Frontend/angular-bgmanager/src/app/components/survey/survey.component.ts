import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { GetService } from "src/app/services/http-requests/get.service";

@Component({
    selector: "app-survey",
    templateUrl: "./survey.component.html",
    styleUrls: ["./survey.component.scss"]
})
export class SurveyComponent implements OnInit {
    shareCode: string;
    candidates: Array<Object>;
    survey: Object;

    surveyForm = new FormGroup({
        username: new FormControl(""),
        password: new FormControl("")
    });
    constructor(
        private activatedRoute: ActivatedRoute,
        private getService: GetService
    ) {}

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.shareCode = params.get("shareCode");
            this.getService.getSurvey(this.shareCode).subscribe(
                value => {
                    console.log(value);
                    const idSurvey = value[0].idSurvey;
                    this.getService.getCandidates(idSurvey).subscribe(
                        value => {
                            const candidates = value;
                            console.log(value);
                            this.candidates = candidates;
                            candidates.forEach(candidate => {
                                this.getService
                                    .getUserGameDetails(candidate["idGame"])
                                    .subscribe(
                                        value => {
                                            console.log(value);
                                            this.candidates.map(candidate => {
                                                candidate["name"] =
                                                    value[0]["name"];
                                            });
                                            console.log(this.candidates);
                                        },
                                        error => {
                                            console.log(error);
                                        }
                                    );
                            });
                        },
                        error => console.log(error)
                    );
                },
                error => {
                    console.log(error);
                }
            );
        });
    }
}
