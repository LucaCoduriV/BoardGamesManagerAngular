import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { GetService } from "src/app/services/http-requests/get.service";
import { promise, element } from "protractor";
import { PostService } from "src/app/services/http-requests/post.service";

@Component({
    selector: "app-survey",
    templateUrl: "./survey.component.html",
    styleUrls: ["./survey.component.scss"]
})
export class SurveyComponent implements OnInit {
    shareCode: string;
    candidates: Array<Object>;
    survey: Object;
    totalVotes: number = 0;

    surveyForm = new FormGroup({
        candidate: new FormControl("")
    });
    constructor(
        private activatedRoute: ActivatedRoute,
        private getService: GetService,
        private postService: PostService
    ) {}

    async ngOnInit() {
        this.getAllInfos();
    }

    calculateVoteOnHundred(nbVotes) {
        if (this.totalVotes != 0) return (+nbVotes * 100) / this.totalVotes;
        else return 0; //sinon 0 divisé par 0 est infini
    }

    getAllInfos() {
        this.activatedRoute.paramMap.subscribe(params => {
            this.shareCode = params.get("shareCode");
            this.getService.getSurvey(this.shareCode).subscribe(value => {
                this.survey = value[0];
                console.log(this.survey);
                const idSurvey = value[0].idSurvey;
                this.getService.getCandidates(idSurvey).subscribe(value => {
                    const candidates = value;
                    this.candidates = candidates;

                    new Promise(resolve => {
                        candidates.forEach(candidate => {
                            this.getService
                                .getUserGameDetails(candidate["idGame"])
                                .subscribe(value => {
                                    //Ajouter le nom du jeu aux objets candidats

                                    candidate["name"] = value[0]["name"];

                                    resolve();
                                });
                        });
                    }).then(() => {
                        console.log(this.candidates);
                        //calculer le nombre de vote total
                        this.candidates.forEach(element => {
                            this.totalVotes += element["nbVotes"];
                        });
                    });
                });
            });
        });
    }

    onSubmit() {
        console.log(this.surveyForm.value);
        const idUser = localStorage.getItem("idUser");
        this.postService
            .vote(
                this.surveyForm.value.candidate,
                this.survey["idSurvey"],
                idUser
            )
            .subscribe(value => {
                console.log(value);
            });
    }
}
