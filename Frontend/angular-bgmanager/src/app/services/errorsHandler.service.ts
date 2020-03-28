import { Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class ErrorsHandler {
    /**
     * Modifie le contenue d'un message d'erreur
     * @param error objet avec les erreurs
     */
    handleError(error) {
        let errorMessage: object;
        console.log(error);
        if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = { message: error.error.message };
        } else {
            // server-side error
            errorMessage = { code: error.status, message: error.error };
        }
        return throwError(errorMessage);
    }
    /**
     * Modifie le contenue d'un message d'erreur pour le login
     * @param error objet avec les erreurs
     */
    handleLoginError(error) {
        let errorMessage: object;
        console.log(error);
        switch (error.status) {
            case 401:
                errorMessage = {
                    code: error.status,
                    message: "Mauvais mot de passe ou utilisateur",
                    type: "danger"
                };
                break;
            default:
                errorMessage = {
                    code: error.status,
                    message: error.error,
                    type: "danger"
                };
                break;
        }

        return throwError(errorMessage);
    }
}
