// Angular
import { Injectable } from '@angular/core';
// Sentry
import * as Sentry from '@sentry/browser';
// Config
import { AppConfig } from 'app/configs/app.config';

Sentry.init({
  dsn: AppConfig.sentryDSN,
});

@Injectable({
  providedIn: 'root',
})
export class SentryErrorService {
  handleError(error) {
    Sentry.captureException(error.originalError || error);
  }
}
