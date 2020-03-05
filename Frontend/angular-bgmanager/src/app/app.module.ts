import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { AppRoutingModule } from "./app-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
//components
import { AppComponent } from "./app.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { HeaderComponent } from "./components/header/header.component";
import { SearchbarComponent } from "./components/searchbar/searchbar.component";
import { GamelistComponent } from "./components/gamelist/gamelist.component";
import { SearchResultComponent } from "./components/search-result/search-result.component";
import { CollectionComponent } from "./components/collection/collection.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { SurveyComponent } from "./components/survey/survey.component";
import { CreateSurveyComponent } from "./components/create-survey/create-survey.component";
import { AdminComponent } from "./components/admin/admin.component";
//services
import { UserService } from "./services/user.service";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { ErrorsHandler } from "./services/errorsHandler.service";
import { PostService } from "./services/http-requests/post.service";
import { GetService } from "./services/http-requests/get.service";
import { PutService } from "./services/http-requests/put.service";
import { DeleteService } from "./services/http-requests/delete.service";
import { GameService } from "./services/game.service";
//pipes
import { RemoveUselessResult } from "./pipes/remove-useless-result.pipe";

@NgModule({
    declarations: [
        AppComponent,
        SidebarComponent,
        HeaderComponent,
        SearchbarComponent,
        GamelistComponent,
        SearchResultComponent,
        CollectionComponent,
        LoginComponent,
        RegisterComponent,
        SurveyComponent,
        CreateSurveyComponent,
        AdminComponent,
        RemoveUselessResult
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        ErrorsHandler,
        PostService,
        GetService,
        PutService,
        DeleteService,
        GameService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
