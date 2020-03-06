import { Injectable } from "@angular/core";
import { Alert } from "../objects/alert";

@Injectable({
    providedIn: "root"
})
export class AlertService {
    alert: Alert;
    isAlertVisible: boolean = false;

    constructor() {}

    modifyAlert(type: string, message: string) {
        this.alert = { type: type, message: message };
    }
    showAlert(bool: boolean) {
        this.isAlertVisible = bool;
    }
}
