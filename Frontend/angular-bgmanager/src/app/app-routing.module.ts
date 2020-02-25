import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SurveyComponent } from "./components/survey/survey.component";
import { GamelistComponent } from "./components/gamelist/gamelist.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";

const routes: Routes = [
  { path: "survey", component: SurveyComponent },
  { path: "gamelist", component: GamelistComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "search-result", component: SearchResultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
