// Angular
import { Injectable } from '@angular/core';
// Ionic
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(public toastController: ToastController) {}

  showSuccess(message: string) {}

  showError(message: string) {}
}
