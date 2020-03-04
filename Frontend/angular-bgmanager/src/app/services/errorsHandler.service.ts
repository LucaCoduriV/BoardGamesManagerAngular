import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class errorsHandler {
    handleError(error) {
        let errorMessage: object;
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = { message: error.error.message };
        } else {
            // server-side error
            errorMessage = { code: error.status, message: error.error };
        }
        return throwError(errorMessage);
    }
}
