import { Injectable } from "@angular/core";
import { Alert } from "../objects/alert";

@Injectable({
    providedIn: "root"
})
export class AlertService {
    alert: Alert;
    isAlertVisible: boolean = false;

    constructor() {}
    /**
     * Modifier le message d'alerte
     * @param type le type d'alert ex: danger, success
     * @param message
     */
    modifyAlert(type: string, message: string) {
        this.alert = { type: type, message: message };
    }
    /**
     * afficher l'alerte sur l'écran
     * @param bool oui/non
     */
    showAlert(bool: boolean) {
        this.isAlertVisible = bool;
    }
}
